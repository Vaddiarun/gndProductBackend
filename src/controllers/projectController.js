import Project from "../models/Project.js";
import Task from "../models/Task.js";
 
// ── CREATE PROJECT ──
export async function createProject(req, res) {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating project", error: err.message });
  }
}
 
// ── LIST ALL PROJECTS ──
export async function listProjects(req, res) {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate({
        path: "milestones.tasks",
        select: "title status expectedEndDate assignee product",
        populate: { path: "product", select: "name" },
      });
 
    res.json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: err.message });
  }
}
 
// ── GET SINGLE PROJECT ──
export async function getProject(req, res) {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate({
        path: "milestones.tasks",
        select: "title status expectedEndDate assignee product",
        populate: { path: "product", select: "name" },
      });
 
    if (!project) return res.status(404).json({ message: "Project not found" });
 
    // Calculate progress
    const totalTasks = project.milestones.reduce(
      (sum, m) => sum + m.tasks.length,
      0
    );
    const tasksDone = project.milestones.reduce(
      (sum, m) => sum + m.tasks.filter((t) => t.status === "DONE").length,
      0
    );
 
    res.json({
      ...project.toObject(),
      summary: { totalTasks, tasksDone },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: err.message });
  }
}
 
// ── UPDATE PROJECT ──
export async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating project", error: err.message });
  }
}
 
// ── DELETE PROJECT ──
export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: err.message });
  }
}
 
// ── ADD MILESTONE ──
export async function addMilestone(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
 
    project.milestones.push(req.body);
    await project.save();
    await project.populate(
      "milestones.tasks",
      "title status expectedEndDate assignee"
    );
    res.status(201).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding milestone", error: err.message });
  }
}
 
// ── UPDATE MILESTONE STATUS ──
export async function updateMilestone(req, res) {
  try {
    const { projectId, milestoneId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
 
    const milestone = project.milestones.id(milestoneId);
    if (!milestone)
      return res.status(404).json({ message: "Milestone not found" });
 
    Object.assign(milestone, req.body);
 
    // Force consistent completedAt behavior
    if (req.body.status === "ACHIEVED") {
      milestone.completedAt = new Date();
    } else {
      milestone.completedAt = null;
    }
 
    await project.save();
    await project.populate(
      "milestones.tasks",
      "title status expectedEndDate assignee"
    );
    res.json(project);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating milestone", error: err.message });
  }
}
 
 
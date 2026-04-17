// src/hooks/useProjectsDb.ts
import { useDispatch } from 'react-redux';
import { db } from '../db';
import { Project, setProjects, addProject, updateProject, deleteProject, ProjectCategory } from '../store/projectsSlice';

function generateShortId(category: ProjectCategory, existingIds: string[]): string {
  let rangeStart: number;
  switch (category) {
    case 'new': rangeStart = 0; break;
    case 'modernization': rangeStart = 2000; break;
    case 'service': rangeStart = 4000; break;
    case 'standard': rangeStart = 6000; break;
    case 'pilot': rangeStart = 8000; break;
  }
  const rangeEnd = rangeStart + 1999;
  const taken = new Set(existingIds.map(id => parseInt(id, 10)));
  let candidate = Math.floor(Math.random() * 2000) + rangeStart;
  let attempts = 0;
  while (taken.has(candidate) && attempts < 2000) {
    candidate = Math.floor(Math.random() * 2000) + rangeStart;
    attempts++;
  }
  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (!taken.has(i)) {
      candidate = i;
      break;
    }
  }
  return candidate.toString().padStart(4, '0');
}

export const useProjectsDb = () => {
  const dispatch = useDispatch();

  const loadProjects = async () => {
    const projects = await db.projects.toArray();
    dispatch(setProjects(projects));
  };

  const addProjectToDb = async (project: Omit<Project, 'id' | 'shortId'>) => {
    const newId = Date.now().toString();
    const existing = await db.projects.toArray();
    const shortId = generateShortId(project.category, existing.map(p => p.shortId));
    const newProject = { ...project, id: newId, shortId };
    await db.projects.add(newProject);
    dispatch(addProject(newProject));
    return newProject;
  };

  const updateProjectInDb = async (project: Project) => {
    await db.projects.put(project);
    dispatch(updateProject(project));
  };

  const deleteProjectFromDb = async (id: string) => {
    await db.projects.delete(id);
    dispatch(deleteProject(id));
  };

  return { loadProjects, addProjectToDb, updateProjectInDb, deleteProjectFromDb };
};

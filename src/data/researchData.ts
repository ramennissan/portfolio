export type ResearchItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  paperLink?: string;
}

export const sampleResearch: ResearchItem[] = [
  {
    id: "research-1",
    title: "LLM-Guided Dexterous Manipulation via Reinforcement Learning",
    description: "Currently working on a paper that utilizes Reinforcement Learning (RL) and Large Language Models (LLMs) to enhance robotic hand dexterity and grasping.",
    image: "/assets/GIFS/research%20demo.gif",
    tags: ["LLM", "Deep RL", "PyBullet"],
    paperLink: "#"
  }
]

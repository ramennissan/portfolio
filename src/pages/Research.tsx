import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import FilterDropdown from "../components/FilterDropdown";
import ResearchCard, { type Research } from "../components/ResearchCard";
import { sampleResearch } from "../data/researchData";

export default function Research() {
  const [research] = useState<Research[]>(sampleResearch);
  const [selectedTag, setSelectedTag] = useState("");

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    research.forEach((item) => {
      item.tags.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [research]);

  const filteredResearch = useMemo(() => {
    if (!selectedTag) return research;
    return research.filter((item) => item.tags.includes(selectedTag));
  }, [research, selectedTag]);

  if (!research.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">No research found</p>
      </div>
    );
  }

  return (
    <section id="research" style={{ marginTop: '6rem' }} className="max-w-3xl mx-auto space-y-16 pb-12 w-full px-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Research</h1>
        </div>
        <div className="relative">
          <FilterDropdown
            value={selectedTag}
            options={availableTags}
            onChange={setSelectedTag}
            label="Filter by Tag"
          />
        </div>
      </div>

      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
      >
        {filteredResearch.map((item, index) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.995 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: 'spring', stiffness: 120, damping: 18 },
              },
            }}
          >
            <ResearchCard research={item} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

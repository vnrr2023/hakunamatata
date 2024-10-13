import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"

const subjects = [
    {
      name: "Information Retrieval",
      insight: "The process of obtaining relevant information from a large repository, typically focused on techniques and models that enable efficient and accurate retrieval of data based on user queries."
    },
    {
      name: "Natural Language Processing",
      insight: "A field of artificial intelligence concerned with the interactions between computers and human languages, aimed at enabling computers to process, understand, and generate natural language."
    },
    {
      name: "Management Information System",
      insight: "An organized approach to collecting, processing, storing, and disseminating data to support management operations and decision-making in organizations."
    },
    {
      name: "Computer Networks",
      insight: "The study of interconnected systems that exchange data and share resources, including the architecture, protocols, and technologies that facilitate communication over a network."
    },
    {
      name: "Software Engineering",
      insight: "A disciplined approach to the development, operation, and maintenance of software, focused on applying engineering principles to create reliable and efficient software systems."
    },
    {
      name: "Data Warehouse Mining",
      insight: "The process of extracting meaningful patterns, trends, and insights from large datasets stored in data warehouses, using specialized analytical techniques and tools."
    },
    {
      name: "Internet Of Things",
      insight: "A network of physical devices embedded with sensors, software, and connectivity that enable them to collect and exchange data, facilitating smart environments and automated systems."
    },
    {
      name: "Mobile Computing",
      insight: "The study and development of mobile applications and systems that allow computing and connectivity on portable devices, enabling users to access information and services on the go."
    },
    {
      name: "Cryptography and System Security",
      insight: "The practice and study of techniques for securing information and systems, including encryption, authentication, and protection against unauthorized access and cyber threats."
    },
    {
      name: "Big Data Analytics",
      insight: "The process of examining large and complex datasets to uncover hidden patterns, correlations, and insights, using advanced analytical techniques to support data-driven decision-making."
    },
    {
      name: "Machine Learning",
      insight: "A branch of artificial intelligence that focuses on developing algorithms and statistical models that enable systems to learn from and make predictions or decisions based on data."
    }
  ];
  

export default function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-12 text-center px-4 py-2 bg-black bg-opacity-50 rounded-lg"
        >
          Explore the Universe of Computer Science
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {mounted && subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0, 0.71, 0.2, 1.01]
              }}
              className="group perspective"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl 
                           transform transition-all duration-500 ease-in-out
                           border border-transparent hover:border-blue-500 hover:bg-blue-900 hover:bg-opacity-20
                           group-hover:shadow-2xl group-hover:shadow-blue-500/20
                           h-full flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 mb-4">
                    {subject.name}
                  </h2>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                                  transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                <p className="mt-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {subject.insight}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { 
  GraduationCap, Briefcase, Award, Heart, 
  MapPin, Calendar, ChevronRight, Code2, 
  Lightbulb, Users, Target
} from 'lucide-react'
import type { AboutData } from '@/lib/data'

interface AboutSectionProps {
  data: AboutData
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section id="about" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.story.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.bio.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full -z-10" />
              <img
                src={data.bio.image}
                alt={data.bio.title}
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {data.bio.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {data.story.content}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Remote - Tanzania</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <span>Available for hire</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{exp.title}</h4>
                      <span className="text-emerald-600 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="text-sm bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {data.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    <p className="text-emerald-600 text-sm mb-2">{edu.period}</p>
                    <p className="text-gray-600 text-sm">{edu.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <Lightbulb className="w-6 h-6 text-white" />}
                  {index === 1 && <Target className="w-6 h-6 text-white" />}
                  {index === 2 && <Users className="w-6 h-6 text-white" />}
                  {index === 3 && <Heart className="w-6 h-6 text-white" />}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

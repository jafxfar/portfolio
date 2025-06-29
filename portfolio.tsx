"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"

export default function Portfolio() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  const projects = [
    {
      title: "Karimov-design",
      description:
        "A React-based project for viewing the fonts, colors, icons, and logos used by Karimov Group.",
      image: `${basePath}/design.svg`,
      technologies: ["React", "TypeScript", "Styled Components"],
      github: "https://github.com/jafxfar/karimov-design",
      live: "#",
    },
    {
      title: "Iki-taxi Landing Page",
      description:
        "Landing page for Karimov Group's taxi company. Modern design and responsive layout.",
      image: `${basePath}/taxi.svg`,
      technologies: ["Vue.js", "TypeScript", "SCSS"],
      github: "https://github.com/jafxfar/iki-taxi",
      live: "#",
    },
    {
      title: "Ikino Streaming Platform",
      description:
        "A streaming platform for Karimov Group, similar to Okko. Built with React.",
      image: `${basePath}/ikino.svg`,
      technologies: ["React", "TypeScript", "Redux"],
      github: "https://github.com/jafxfar/ikino",
      live: "https://dl.iki.tj/",
    },
    {
      title: "ITNT Projects",
      description:
        "A social platform for startups: publish ideas, form teams, and attract investments. Over 1.5 years of remote work in a distributed team. Developed with Vue.js, Vuetify, and TypeScript.",
      image: `${basePath}/itnt.svg`,
      technologies: ["Vue.js", "Vuetify", "TypeScript"],
      github: "https://github.com/jafxfar/itnt_front_main",
      live: "https://itnt.store/#/",
    },
    {
      title: "ShamCRM",
      description:
        "CRM system similar to Bitrix24, developed in a team at LLC FinGroup. Built with Vue.js, PrimeVue, SCSS, and Pinia. Request a demo on the info page.",
      image: `${basePath}/shamcrm.svg`,
      technologies: ["Vue.js", "PrimeVue", "SCSS", "Pinia"],
      github: null, 
      live: "https://shamcrm.com/",
    },
  ]

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "Git",
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="#" className="text-xl font-bold">
             JX
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <motion.section
        className="pt-32 pb-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <Image
              src={`${basePath}/placeholder.svg`}
              alt="JX"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 border-4 border-primary/10"
            />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-6 text-black">
           JAFAR JAMSHEDI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">Front-end Developer</p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            I create digital experiences that combine beautiful design with robust functionality. Passionate about clean
            code, user experience, and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" asChild>
              <Link href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href={`${basePath}/Jafar%20Jamshedi.pdf`}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="py-20 px-4 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                With over 5 years of experience in web development, I specialize in building modern, scalable
                applications using cutting-edge technologies. My passion is bridging the gap between design and
                development.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                I believe in writing clean, maintainable code and creating intuitive user experiences that solve
                real-world problems.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-semibold">Problem Solver</h3>
                  <p className="text-muted-foreground">I love tackling complex challenges</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="font-semibold">Innovation Focused</h3>
                  <p className="text-muted-foreground">Always exploring new technologies</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold">Team Player</h3>
                  <p className="text-muted-foreground">Collaborative and communicative</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg bg-neutral-200 dark:bg-neutral-800 p-6 flex items-center justify-center" style={{ minHeight: 200 }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={180}
                        height={100}
                        className="object-contain max-w-[180px] mx-auto"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <CardDescription className="mb-4 text-sm">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.github}>
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </Link>
                        </Button>
                      )}
                      <Button size="sm" asChild>
                        <Link href={project.live}>
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="py-20 px-4 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="mailto:jafarjamshedi5@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Link>
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/jafxfar"  target="_blank"  aria-label="GitHub">
                <Github className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/jafar-j-a615452aa/" target="_blank" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:jafarjamshedi5@gmail.com" aria-label="Email">
                <Mail className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div> 
      </motion.section>
  </div>

  )
}

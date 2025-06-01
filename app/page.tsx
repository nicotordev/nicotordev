'use client';
import { motion } from 'framer-motion';
import HomeCarousel from '@/components/HomeCarousel';

export default function Home() {
  return (
    <div className="w-full bg-gray-200">
      <section className="relative h-screen flex items-center justify-center bg-grid overflow-hidden w-full">
        {/* left top blob */}
        <div className="blob blob-primary blob-top-left z-50 -left-72 -top-72 !w-[550px] !h-[550px] !blur-3xl scale-200 opacity-25" />
        <div className="blob blob-secondary blob-top-right z-40 -left-96 -top-96 !w-[620px] !h-[620px] !blur-3xl scale-200 opacity-25" />
        {/* left bottom blob */}
        <div className="blob blob-accent blob-bottom-left z-30 -left-72 -bottom-72 !w-[580px] !h-[580px] !blur-3xl scale-200 opacity-25" />
        {/* right bottom blob */}
        <div className="blob blob-primary blob-bottom-right z-20 -right-72 -bottom-72 !w-[530px] !h-[530px] !blur-3xl scale-200 opacity-25" />
        {/* right top blob */}
        <div className="blob blob-secondary blob-top-right z-40 -right-96 -top-96 !w-[600px] !h-[600px] !blur-3xl scale-200 opacity-25" />

        <div className="container mx-auto">
          <div className="flex flex-col justify-center mt-22">
            <motion.h1
              className="text-6xl font-bold text-gray-900 text-center"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Hello, I&apos;m{' '}
              <span className="text-pink-500 font-bold">Nicolas Torres</span>{' '}
            </motion.h1>
            <motion.p
              className="text-gray-900 text-lg mt-2 text-center"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              I&apos;m a passionate{' '}
              <span className="text-pink-500 font-semibold text-center">
                Full Stack Developer
              </span>{' '}
              with expertise in building modern web applications.
            </motion.p>
            <div className="flex flex-col justify-center items-center gap-4 flex-wrap mt-6">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap mt-6">
                <motion.a
                  href="#about"
                  className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-colors"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  About me
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download
                  className="bg-transparent text-gray-800 px-4 py-2 rounded-md border-2 border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Resume
                </motion.a>
              </div>
              <div className="flex items-center gap-4 mr-6">
                <motion.a
                  href="https://github.com/nicotordev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-gray-800 p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors flex items-center justify-center w-9 h-9"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/nicotordev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-gray-800 p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors flex items-center justify-center w-9 h-9"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="mailto:nicotordev@gmail.com"
                  className="bg-transparent text-gray-800 p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors flex items-center justify-center w-9 h-9"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                </motion.a>
              </div>
            </div>
            <div className="mt-20">
              <HomeCarousel />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

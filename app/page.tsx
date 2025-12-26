'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const script = [
  {
    text: "Welcome! Today, I'll show you how to build your own app in just 5 minutes. Yes, you heard that right - 5 minutes!",
    duration: 7000,
    scene: 'intro'
  },
  {
    text: "Step 1: Choose Your Platform. You have three powerful options: No-code builders, AI-powered generators, or rapid frameworks.",
    duration: 8000,
    scene: 'platforms'
  },
  {
    text: "No-code platforms like Bubble, Glide, or FlutterFlow let you drag and drop components. Perfect for beginners with zero coding experience!",
    duration: 9000,
    scene: 'nocode'
  },
  {
    text: "Step 2: Define Your App Idea. Keep it simple! A to-do list, a personal portfolio, or a simple calculator are perfect starter projects.",
    duration: 8000,
    scene: 'idea'
  },
  {
    text: "Step 3: Use AI Tools. Tools like ChatGPT, Claude, or GitHub Copilot can generate code for you instantly. Just describe what you want!",
    duration: 9000,
    scene: 'ai'
  },
  {
    text: "Step 4: Quick Setup. With tools like Replit, CodeSandbox, or Vercel, you can code and deploy directly in your browser - no installation needed!",
    duration: 9000,
    scene: 'setup'
  },
  {
    text: "Step 5: Deploy Your App. One click and your app is live! Share it with the world through a public URL.",
    duration: 8000,
    scene: 'deploy'
  },
  {
    text: "Pro Tips: Start small, use templates, leverage AI assistance, and don't be afraid to experiment. Every expert was once a beginner!",
    duration: 10000,
    scene: 'tips'
  },
  {
    text: "Congratulations! You now know how to build an app in 5 minutes. The best way to learn is by doing. Start building today!",
    duration: 8000,
    scene: 'outro'
  }
]

export default function VideoExplainer() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const currentDuration = script[currentScene].duration
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentScene < script.length - 1) {
            setCurrentScene(prev => prev + 1)
            return 0
          } else {
            setIsPlaying(false)
            return 100
          }
        }
        return prev + (100 / (currentDuration / 50))
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isPlaying, currentScene])

  useEffect(() => {
    if (isPlaying) {
      const utterance = new SpeechSynthesisUtterance(script[currentScene].text)
      utterance.rate = 0.95
      utterance.pitch = 1
      utterance.volume = 1
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }, [currentScene, isPlaying])

  const startVideo = () => {
    setCurrentScene(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const pauseVideo = () => {
    setIsPlaying(false)
    window.speechSynthesis.cancel()
  }

  const restartVideo = () => {
    window.speechSynthesis.cancel()
    setCurrentScene(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const renderScene = () => {
    const scene = script[currentScene].scene

    switch (scene) {
      case 'intro':
        return (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.8 }}
            className="scene-container"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="icon-large"
            >
              📱
            </motion.div>
            <h1 className="title-large">Build Your App in 5 Minutes</h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="subtitle"
            >
              ⚡ Fast • 🎨 Easy • 🚀 Powerful
            </motion.div>
          </motion.div>
        )

      case 'platforms':
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="scene-container"
          >
            <h2 className="scene-title">Step 1: Choose Your Platform</h2>
            <div className="cards-container">
              {[
                { icon: '🎨', title: 'No-Code', color: '#FF6B6B' },
                { icon: '🤖', title: 'AI-Powered', color: '#4ECDC4' },
                { icon: '⚡', title: 'Frameworks', color: '#FFE66D' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="card"
                  style={{ borderColor: item.color }}
                >
                  <div className="card-icon">{item.icon}</div>
                  <div className="card-title">{item.title}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'nocode':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="scene-container"
          >
            <h2 className="scene-title">No-Code Platforms</h2>
            <div className="drag-drop-demo">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                  className="component-block"
                  style={{
                    left: `${20 + i * 25}%`,
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D'][i-1]
                  }}
                >
                  <div className="block-label">Component {i}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="demo-text"
            >
              Drag & Drop • No Coding Required
            </motion.div>
          </motion.div>
        )

      case 'idea':
        return (
          <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            className="scene-container"
          >
            <h2 className="scene-title">Step 2: Define Your Idea</h2>
            <div className="ideas-grid">
              {[
                { icon: '✅', text: 'To-Do App' },
                { icon: '🎨', text: 'Portfolio' },
                { icon: '🧮', text: 'Calculator' },
                { icon: '📝', text: 'Note Taker' }
              ].map((idea, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="idea-card"
                >
                  <div className="idea-icon">{idea.icon}</div>
                  <div className="idea-text">{idea.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'ai':
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="scene-container"
          >
            <h2 className="scene-title">Step 3: Use AI Tools</h2>
            <div className="ai-demo">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(78, 205, 196, 0.3)',
                    '0 0 40px rgba(78, 205, 196, 0.6)',
                    '0 0 20px rgba(78, 205, 196, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ai-prompt-box"
              >
                <div className="prompt-label">Your Prompt:</div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="typing-text"
                >
                  "Create a simple to-do list app"
                </motion.div>
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="ai-processing"
              >
                ⚙️
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="code-output"
              >
                <div className="code-line">{'function TodoApp() {'}</div>
                <div className="code-line">{'  return <div>...'}</div>
                <div className="code-line">{'}'}</div>
              </motion.div>
            </div>
          </motion.div>
        )

      case 'setup':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="scene-container"
          >
            <h2 className="scene-title">Step 4: Quick Setup</h2>
            <div className="browser-demo">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                className="browser-window"
              >
                <div className="browser-bar">
                  <div className="browser-dots">
                    <span style={{background: '#FF5F56'}}></span>
                    <span style={{background: '#FFBD2E'}}></span>
                    <span style={{background: '#27C93F'}}></span>
                  </div>
                  <div className="browser-url">replit.com/new</div>
                </div>
                <div className="browser-content">
                  <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="code-editor"
                  >
                    <div className="editor-line">
                      <span className="code-keyword">const</span> app = <span className="code-string">"My App"</span>
                    </div>
                    <div className="editor-line">
                      <span className="code-keyword">export</span> default app
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="no-install-badge"
              >
                ✨ No Installation Required!
              </motion.div>
            </div>
          </motion.div>
        )

      case 'deploy':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="scene-container"
          >
            <h2 className="scene-title">Step 5: Deploy</h2>
            <div className="deploy-demo">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 107, 107, 0.5)',
                    '0 0 40px rgba(255, 107, 107, 0.8)',
                    '0 0 20px rgba(255, 107, 107, 0.5)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="deploy-button"
              >
                🚀 Deploy Now
              </motion.button>
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="progress-bar-container"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="progress-bar"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: 'spring' }}
                className="success-message"
              >
                ✅ Live at: myapp.vercel.app
              </motion.div>
            </div>
          </motion.div>
        )

      case 'tips':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="scene-container"
          >
            <h2 className="scene-title">Pro Tips</h2>
            <div className="tips-list">
              {[
                { icon: '🎯', text: 'Start Small' },
                { icon: '📋', text: 'Use Templates' },
                { icon: '🤖', text: 'Leverage AI' },
                { icon: '🧪', text: 'Experiment Often' }
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3, type: 'spring' }}
                  className="tip-item"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: i * 0.3 + 0.5 }}
                    className="tip-icon"
                  >
                    {tip.icon}
                  </motion.span>
                  <span className="tip-text">{tip.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'outro':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="scene-container"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="outro-icon"
            >
              🎉
            </motion.div>
            <h1 className="outro-title">You're Ready!</h1>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="outro-subtitle"
            >
              Start Building Today
            </motion.div>
            <div className="outro-cta">
              <div className="cta-text">Every Expert Was Once a Beginner</div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="cta-arrow"
              >
                👇
              </motion.div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="video-container">
      <div className="video-screen">
        <AnimatePresence mode="wait">
          {renderScene()}
        </AnimatePresence>
      </div>

      <div className="controls">
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="control-buttons">
          {!isPlaying ? (
            <button onClick={startVideo} className="control-btn primary">
              ▶️ Play
            </button>
          ) : (
            <button onClick={pauseVideo} className="control-btn">
              ⏸️ Pause
            </button>
          )}
          <button onClick={restartVideo} className="control-btn">
            🔄 Restart
          </button>
        </div>

        <div className="scene-indicator">
          Scene {currentScene + 1} of {script.length}
        </div>
      </div>

      <div className="script-display">
        <div className="script-title">Current Script:</div>
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="script-text"
        >
          {script[currentScene].text}
        </motion.div>
      </div>

      <style jsx>{`
        .video-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }

        .video-screen {
          width: 100%;
          max-width: 1200px;
          height: 600px;
          background: #1a1a2e;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          position: relative;
        }

        .scene-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          text-align: center;
        }

        .title-large {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 30px 0;
        }

        .icon-large {
          font-size: 8rem;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
        }

        .subtitle {
          font-size: 1.8rem;
          color: #4ECDC4;
          margin-top: 20px;
        }

        .scene-title {
          font-size: 3rem;
          margin-bottom: 50px;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .cards-container {
          display: flex;
          gap: 40px;
          justify-content: center;
        }

        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          border: 3px solid;
          min-width: 200px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .drag-drop-demo {
          position: relative;
          width: 100%;
          height: 300px;
          margin: 40px 0;
        }

        .component-block {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .block-label {
          color: #1a1a2e;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .demo-text {
          font-size: 1.8rem;
          color: #4ECDC4;
          margin-top: 20px;
        }

        .ideas-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 40px;
        }

        .idea-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .idea-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .idea-text {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .ai-demo {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;
          max-width: 600px;
        }

        .ai-prompt-box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 15px;
          border: 2px solid #4ECDC4;
        }

        .prompt-label {
          font-size: 1.2rem;
          color: #4ECDC4;
          margin-bottom: 15px;
          text-align: left;
        }

        .typing-text {
          font-size: 1.5rem;
          font-family: 'Courier New', monospace;
          text-align: left;
          overflow: hidden;
        }

        .ai-processing {
          font-size: 4rem;
          text-align: center;
        }

        .code-output {
          background: #0d1117;
          padding: 25px;
          border-radius: 10px;
          font-family: 'Courier New', monospace;
          text-align: left;
        }

        .code-line {
          color: #58a6ff;
          margin: 10px 0;
          font-size: 1.2rem;
        }

        .browser-demo {
          display: flex;
          flex-direction: column;
          gap: 30px;
          width: 100%;
          max-width: 700px;
        }

        .browser-window {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .browser-bar {
          background: #e8e8e8;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .browser-dots {
          display: flex;
          gap: 8px;
        }

        .browser-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .browser-url {
          background: #fff;
          padding: 8px 15px;
          border-radius: 5px;
          color: #666;
          flex: 1;
        }

        .browser-content {
          background: #1a1a2e;
          padding: 30px;
          min-height: 200px;
        }

        .code-editor {
          font-family: 'Courier New', monospace;
          color: #fff;
        }

        .editor-line {
          margin: 10px 0;
          font-size: 1.2rem;
        }

        .code-keyword {
          color: #ff6b6b;
        }

        .code-string {
          color: #4ecdc4;
        }

        .no-install-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 600;
          text-align: center;
        }

        .deploy-demo {
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
          width: 100%;
          max-width: 500px;
        }

        .deploy-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
          color: white;
          border: none;
          padding: 25px 60px;
          border-radius: 50px;
          font-size: 2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .progress-bar-container {
          width: 100%;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4ecdc4 0%, #44a08d 100%);
          border-radius: 15px;
        }

        .success-message {
          font-size: 1.8rem;
          color: #4ecdc4;
          font-weight: 600;
        }

        .tips-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
          width: 100%;
          max-width: 600px;
        }

        .tip-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 25px 40px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 25px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .tip-icon {
          font-size: 3rem;
        }

        .tip-text {
          font-size: 1.8rem;
          font-weight: 600;
        }

        .outro-icon {
          font-size: 8rem;
          margin-bottom: 30px;
        }

        .outro-title {
          font-size: 5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .outro-subtitle {
          font-size: 2.5rem;
          color: #FFE66D;
          margin-bottom: 40px;
        }

        .outro-cta {
          margin-top: 40px;
        }

        .cta-text {
          font-size: 1.8rem;
          color: #fff;
          margin-bottom: 20px;
        }

        .cta-arrow {
          font-size: 3rem;
        }

        .controls {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 1200px;
        }

        .progress-container {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 0.1s linear;
        }

        .control-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 15px;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 30px;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .control-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }

        .scene-indicator {
          text-align: center;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .script-display {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 1200px;
        }

        .script-title {
          font-size: 1.2rem;
          color: #4ECDC4;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .script-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #fff;
        }

        @media (max-width: 768px) {
          .video-screen {
            height: 400px;
          }

          .title-large {
            font-size: 2rem;
          }

          .icon-large {
            font-size: 4rem;
          }

          .scene-title {
            font-size: 2rem;
          }

          .cards-container {
            flex-direction: column;
            gap: 20px;
          }

          .ideas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

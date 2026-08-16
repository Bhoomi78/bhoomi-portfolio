/**
 * JARVIS AI Voice Assistant Simulator
 * Interactive Browser Simulation for Bhoomi's AI Project
 */

(function () {
  'use strict';

  // DOM Elements
  const feed = document.getElementById('jarvis-feed');
  const form = document.getElementById('jarvis-form');
  const textInput = document.getElementById('jarvis-text-input');
  const micBtn = document.getElementById('jarvis-mic-btn');
  const clearBtn = document.getElementById('jarvis-clear-btn');
  const voiceToggleBtn = document.getElementById('jarvis-speech-toggle');
  const voiceIcon = document.getElementById('jarvis-speech-icon');
  const orb = document.getElementById('jarvis-core-orb');
  const stateLabel = document.getElementById('jarvis-state-label');
  const canvas = document.getElementById('jarvis-wave-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const chipButtons = document.querySelectorAll('.jarvis-chip');

  // Simulator State
  let isVoiceEnabled = true;
  let isListening = false;
  let isSpeaking = false;
  let recognition = null;
  let wavePhase = 0;

  // Initialize Speech Recognition if supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isListening = true;
      if (micBtn) micBtn.classList.add('listening');
      updateState('Listening for voice...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (textInput) textInput.value = transcript;
      handleCommand(transcript);
    };

    recognition.onerror = () => {
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
      updateState('Voice ended. Type query below.');
    };

    recognition.onend = () => {
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
      if (!isSpeaking) {
        updateState('Status: Ready');
      }
    };
  }

  // Tech & Data Jokes Dataset
  const dataJokes = [
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why do data analysts love Power BI? Because it turns chaos into clear business charts!",
    "Why was the dataset always calm? Because it was thoroughly cleaned and normalized in PostgreSQL!",
    "There are 10 types of people: those who understand binary, and those who don't.",
    "Why did the Python developer love Pandas? Because DataFrame indexing is second nature!"
  ];

  function updateState(msg) {
    if (stateLabel) {
      stateLabel.textContent = `JARVIS: ${msg}`;
    }
  }

  function appendMessage(sender, text, isUser = false) {
    if (!feed) return;
    const item = document.createElement('div');
    item.className = `feed-item ${isUser ? 'user-input' : 'ai-response'}`;

    const authorSpan = document.createElement('span');
    authorSpan.className = 'item-sender';
    authorSpan.textContent = `${sender}:`;

    const bodySpan = document.createElement('span');
    bodySpan.className = 'item-text';
    bodySpan.innerHTML = text;

    item.appendChild(authorSpan);
    item.appendChild(bodySpan);
    feed.appendChild(item);
    feed.scrollTop = feed.scrollHeight;
  }

  function speakResponse(text) {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Samantha'))));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      isSpeaking = true;
      if (orb) orb.classList.add('speaking');
      updateState('Synthesizing speech...');
    };

    utterance.onend = () => {
      isSpeaking = false;
      if (orb) orb.classList.remove('speaking');
      updateState('Status: Ready');
    };

    utterance.onerror = () => {
      isSpeaking = false;
      if (orb) orb.classList.remove('speaking');
      updateState('Status: Ready');
    };

    window.speechSynthesis.speak(utterance);
  }

  async function handleCommand(cmd) {
    if (!cmd || !cmd.trim()) return;
    const cleanCmd = cmd.trim();
    const lower = cleanCmd.toLowerCase();

    appendMessage('You', cleanCmd, true);
    if (textInput) textInput.value = '';

    updateState('Processing...');

    setTimeout(async () => {
      let reply = "";

      if (lower.includes('time') || lower.includes('date')) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
        reply = `The current time is <strong>${timeString}</strong> on <strong>${dateString}</strong>.`;
      } 
      else if (lower.includes('who is bhoomi') || lower.includes('about bhoomi') || lower.includes('bhoomi srivastava')) {
        reply = `<strong>Bhoomi Srivastava</strong> is a Computer Science undergraduate specializing in Artificial Intelligence at Babu Banarasi Das University. She is focused on Data Analytics, Business Intelligence, SQL, PostgreSQL, Power BI, Excel, and Python.`;
      } 
      else if (lower.includes('wikipedia') || lower.includes('wiki')) {
        const queryTerm = cleanCmd.replace(/search wikipedia:?/i, '').replace(/wikipedia/i, '').trim() || 'Business Intelligence';
        reply = `<em>Fetching Wikipedia summary for '${queryTerm}'...</em><br><br>`;
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(queryTerm)}`);
          if (res.ok) {
            const data = await res.json();
            reply += `<strong>${data.title}:</strong> ${data.extract || 'Summary available on Wikipedia.'}`;
          } else {
            reply += `<strong>${queryTerm}:</strong> Strategies and technologies used by enterprises for the data analysis and management of business information.`;
          }
        } catch (e) {
          reply += `<strong>${queryTerm}:</strong> Transforming raw organizational data into actionable executive insights.`;
        }
      } 
      else if (lower.includes('diagnostic') || lower.includes('system status')) {
        reply = `⚙️ <strong>System Diagnostic:</strong><br>` +
                `• Voice Recognition Engine: READY<br>` +
                `• Speech Synthesis Pipeline: OPERATIONAL<br>` +
                `• Analytical Query Dispatcher: ONLINE<br>` +
                `• Latency &amp; Memory: 0 faults detected`;
      } 
      else if (lower.includes('joke')) {
        const randomJoke = dataJokes[Math.floor(Math.random() * dataJokes.length)];
        reply = `😄 ${randomJoke}`;
      } 
      else {
        reply = `Command received: "<em>${cleanCmd}</em>". In Bhoomi's Python implementation, this triggers automated OS tasks, data query dispatchers, or knowledge retrieval.`;
      }

      appendMessage('JARVIS', reply, false);
      speakResponse(reply);
    }, 300);
  }

  function initWaveVisualizer() {
    if (!canvas || !ctx) return;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.lineWidth = 2;
      ctx.strokeStyle = isSpeaking ? '#38bdf8' : (isListening ? '#ef4444' : 'rgba(56, 189, 248, 0.35)');
      ctx.beginPath();

      const amplitude = isSpeaking ? 14 : (isListening ? 10 : 3);
      const frequency = isSpeaking ? 0.06 : 0.02;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency + wavePhase) * amplitude * Math.sin((x / width) * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      wavePhase += isSpeaking ? 0.14 : 0.03;
      requestAnimationFrame(render);
    }

    render();
  }

  // Event Listeners
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (textInput) handleCommand(textInput.value);
    });
  }

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if (!recognition) {
        alert('Speech recognition is not supported in this browser. Please type your query in the input box.');
        return;
      }
      if (isListening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (err) {
          console.warn(err);
        }
      }
    });
  }

  chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        if (textInput) textInput.value = cmd;
        handleCommand(cmd);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (feed) {
        feed.innerHTML = `
          <div class="feed-item ai-response">
            <span class="item-sender">JARVIS:</span>
            <span class="item-text">Feed cleared. How can I assist you?</span>
          </div>
        `;
      }
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
  }

  if (voiceToggleBtn && voiceIcon) {
    voiceToggleBtn.addEventListener('click', () => {
      isVoiceEnabled = !isVoiceEnabled;
      if (!isVoiceEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      voiceIcon.textContent = isVoiceEnabled ? '🔊 Voice: ON' : '🔇 Voice: OFF';
    });
  }

  initWaveVisualizer();
})();

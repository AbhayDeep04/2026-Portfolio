'use client';

import React from 'react';
import Image from 'next/image';

const AboutWindow: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-full overflow-auto">
      {/* Left Section - Profile Picture */}
      <div className="flex flex-col items-center shrink-0" style={{ minWidth: '180px' }}>
        <div
          className="border-2 p-2 bg-white"
          style={{
            borderStyle: 'inset',
            borderColor: '#808080 #ffffff #ffffff #808080'
          }}
        >
          <div className="relative w-40 h-40 bg-gray-200">
            <Image
              src="/profilepic.jpg"
              alt="Abhay Deep Singh"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
        <div className="mt-3 text-center font-bold" style={{ fontSize: '12px' }}>
          Abhay Deep Singh
        </div>
        <div className="text-center" style={{ fontSize: '11px', color: '#666' }}>
          B.S. Computer Science
        </div>
        <div className="text-center" style={{ fontSize: '11px', color: '#666' }}>
          Georgia State University
        </div>
        <div className="mt-2 text-center" style={{ fontSize: '10px', color: '#555' }}>
          abhaydeepsingh.gm@gmail.com
        </div>
        <div className="text-center" style={{ fontSize: '10px', color: '#555' }}>
          (929) 450-9682
        </div>
      </div>

      {/* Center Section - About Me */}
      <div
        className="flex-1 border-2 bg-white overflow-auto"
        style={{
          borderStyle: 'inset',
          borderColor: '#808080 #ffffff #ffffff #808080',
          fontSize: '12px',
          lineHeight: '1.8',
          padding: '12px 20px',
        }}
      >
    
        <p className="mb-3">
          Hello! I am a <strong>Presidential Scholar</strong> at the Honors College of Georgia State University pursuing a Bachelor's in Computer Science , graduating in May 2026
          with a <strong>4.0 GPA</strong>. My background involves engineering production-grade software at
          FAANG scale and leading technical initiatives in high-growth startup environments.
        </p>
        <br />

        <p className="mb-3">
          <strong style={{ fontSize: '12px' }}>Software Engineering at Amazon:</strong><br />
          As a 2025 SDE Intern at the Amazon, I focused on building internal
          infrastructure to optimize developer productivity and cloud visibility. I architected an automated
          API generation pipeline to streamline financial service integrations and developed a serverless
          monitoring platform for large-scale AWS migrations that provided critical cost and progress
          visibility for senior leadership. Both my L5 mentor and L6 manager gave me letters of recommendation
          because I delivered projects that developers in my team actually needed, and I delivered them fast.
        </p>
        <br />

        <p className="mb-3">
          <strong style={{ fontSize: '12px' }}>Applied AI &amp; Systems Architecture:</strong><br />
          I specialize in the engineering layer of GenAI, with a focus on architecting agentic workflows
          and Retrieval-Augmented Generation (RAG) pipelines. My work centers on building autonomous systems
          capable of handling complex enterprise data using a modern stack including vLLM, LangChain,
          LlamaIndex, and Qdrant. I also leverage AWS Bedrock guardrails to build reliable, safe AI systems
          that are less prone to hallucination and better at staying on task.
        </p>
        <br />

        <p className="mb-3">
          <strong style={{ fontSize: '12px' }}>Ownership &amp; Leadership:</strong><br />
          I operate with high agency and thrive in technical ambiguity. Whether leading a four-person
          engineering team to overhaul digital infrastructure at Pemdas Productions or navigating complex
          blockers at Amazon, I prioritize stakeholder management, independent problem-solving, and shipping
          high-impact code. When faced with blockers, I never ask for the solution — I ask for the
          documentation and resources to engineer the solution myself.
        </p>
        <br />

        <p className="mb-3">
          <strong style={{ fontSize: '12px' }}>The Presidential Scholarship:</strong><br />
          I am the first international student awarded GSU's Presidential Scholarship, an elite honor limited
          to the top 10 students. This 4-year full ride covers 100% of tuition, housing, and dining. Through
          the University Assistantship Program, I serve as an Undergraduate Research Assistant within the
          Honors College while maintaining a 4.0 GPA.
        </p>
        <br />

        <p>
          Beyond academics, I've pioneered <strong>Quantum Computing research</strong> at GSU with Professor
          Ashwin Ashok, won <strong>HackGT 2023</strong> with NestQuest, and earned certifications from
          Harvard, Georgia Tech, and NYU. I also give back through fundraising and teaching the blind
          under Team Vision Foundation.
        </p>
      </div>

      {/* Right Section - Information/Skills */}
      <div className="shrink-0 md:w-[200px]">
        <div
          className="border-2 p-2 bg-gray-100"
          style={{
            borderStyle: 'outset',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <h3 className="font-bold mb-2 pb-1 border-b border-gray-400" style={{ fontSize: '12px' }}>
            AI/ML Technologies
          </h3>

          <div className="mt-2" style={{ fontSize: '11px' }}>
            <div className="mb-3">
              <div className="font-bold mb-1">Frameworks:</div>
              <div className="ml-2">• TensorFlow</div>
              <div className="ml-2">• PyTorch</div>
              <div className="ml-2">• Keras</div>
              <div className="ml-2">• Transformers</div>
            </div>

            <div className="mb-3">
              <div className="font-bold mb-1">LLM Tools:</div>
              <div className="ml-2">• LangChain</div>
              <div className="ml-2">• LlamaIndex</div>
              <div className="ml-2">• Hugging Face</div>
              <div className="ml-2">• vLLM</div>
            </div>

            <div className="mb-3">
              <div className="font-bold mb-1">Vector DBs:</div>
              <div className="ml-2">• Qdrant</div>
              <div className="ml-2">• Typesense</div>
            </div>

            <div className="mb-3">
              <div className="font-bold mb-1">Cloud AI:</div>
              <div className="ml-2">• AWS Bedrock</div>
              <div className="ml-2">• OpenAI API</div>
            </div>

            <div>
              <div className="font-bold mb-1">Quantum:</div>
              <div className="ml-2">• IBM QISKIT</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className="border-2 p-2 bg-gray-100 mt-3"
          style={{
            borderStyle: 'outset',
            borderColor: '#ffffff #808080 #808080 #ffffff',
            fontSize: '10px'
          }}
        >
          <div className="font-bold mb-2">Quick Stats</div>
          <div className="space-y-1">
            <div>🎓 GPA: <strong>4.0</strong></div>
            <div>📚 SAT: <strong>1540</strong></div>
            <div>🏆 HackGT Winner</div>
            <div>💼 Amazon SDE '25</div>
            <div>🔬 Research Pioneer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;

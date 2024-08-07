'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TeamMemberCard = dynamic(() => import('./TeamMemberCard')); // Import the new TeamMemberCard component

const teamMembers = [
  {
    name: 'Casey',
    title: 'AR/VR Developer',
    avatar: '/assets/images/caseycjc.jpg',
    socialLinks: [
      { type: 'github', url: 'https://github.com/Caseycjc' },
      { type: 'linkedin', url: 'https://www.linkedin.com/in/caseycjc' },
    ],
  },
  {
    name: 'Eve',
    title: 'Full Stack Developer',
    avatar: '/assets/images/evebaker.png',
    socialLinks: [
      { type: 'github', url: 'https://github.com/EveBaker' },
      { type: 'linkedin', url: 'https://www.linkedin.com/in/evebaker0162' },
    ],
  },
  {
    name: 'Crystal',
    title: 'Full Stack Developer',
    avatar: '/assets/images/ckcarr.jpg',
    socialLinks: [
      { type: 'github', url: 'https://github.com/CKCarr' },
      { type: 'linkedin', url: 'https://www.linkedin.com/in/crystal-carrillo' },
    ],
  },
];

const TeamLinks: React.FC = () => {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Team Information */}
          <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-6 bg-primary-green rounded text-white pl-4 py-2">
              Get in Touch With The Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.name}
                  name={member.name}
                  title={member.title}
                  avatar={member.avatar}
                  socialLinks={member.socialLinks}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamLinks;

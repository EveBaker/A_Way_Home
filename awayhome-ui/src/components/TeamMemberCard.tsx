import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from '../app/MTailwind';

interface SocialLink {
  type: string;
  url: string;
}

interface TeamMemberCardProps {
  name: string;
  title: string;
  avatar: string;
  socialLinks: SocialLink[];
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  title,
  avatar,
  socialLinks,
}) => {
  const getLinkText = (type: string, url: string): string => {
    switch (type) {
      case 'github':
        return `GitHub: ${url.split('/').pop()}`;
      case 'linkedin':
        return `LinkedIn: ${url.split('/').pop()}`;
      case 'email':
        return `Email: ${url}`;
      case 'phone':
        return `Phone: ${url}`;
      case 'x':
        return `X: ${url.split('/').pop()}`;
      case 'facebook':
        return `Facebook: ${url.split('/').pop()}`;
      default:
        return url;
    }
  };

  return (
    <Card className="p-4 rounded-lg shadow-md text-center border-3 border-primary-blue">
      <CardHeader className="flex justify-center bg-primary-blue">
        <Avatar
          src={avatar}
          alt={name}
          size="xxl"
          className="mb-4 border-2 border-bright-teal"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" className="mb-2">
          {name}
        </Typography>
        <Typography variant="body2">{title}</Typography>
      </CardBody>
      <CardFooter>
        {socialLinks.map((link) => (
          <Typography variant="body2" key={link.type}>
            <a
              href={
                link.type === 'email'
                  ? `mailto:${link.url}`
                  : link.type === 'phone'
                    ? `tel:${link.url}`
                    : link.url
              }
              className="text-turquoise"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getLinkText(link.type, link.url)}
            </a>
          </Typography>
        ))}
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;

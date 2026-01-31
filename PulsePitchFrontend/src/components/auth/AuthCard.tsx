import React, { memo } from 'react';
import { Card } from '../ui/Card';
import { Layout } from '../Layout/Layout';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export const AuthCard: React.FC<AuthCardProps> = memo(({ children, title }) => {
  return (
    <Layout variant="centered">
      <Card className="w-full p-8">
        <h1 className="text-3xl font-bold text-center text-neutral-800 mb-8">
          {title}
        </h1>
        <div className="space-y-6">
          {children}
        </div>
      </Card>
    </Layout>
  );
});

AuthCard.displayName = 'AuthCard';

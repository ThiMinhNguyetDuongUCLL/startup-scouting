import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartupsPage } from './features/startups/StartupsPage';
import { StartupDetail } from './features/startups/StartupDetail';
import { AuthPage } from './pages/AuthPage';
import { Layout } from './components/Layout.tsx';

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<StartupsPage />} />
                    <Route path="startup/:id" element={<StartupDetail />} />
                </Route>
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </BrowserRouter>
    );
};

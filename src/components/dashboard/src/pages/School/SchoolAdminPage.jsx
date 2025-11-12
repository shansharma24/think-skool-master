/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, BarChart, Bell } from 'lucide-react';
import Sidebar from '../../components/School/Sidebar.jsx';
import Navbar from '../../components/School/Navbar';
import DashboardAnalyticsPanel from '../../components/School/DashboardAnalyticsPanel';
import UserCourseOversightPanel from '../../components/School/UserCourseOversightPanel';
import AcademicMonitoringPanel from '../../components/School/AcademicMonitoringPanel';
import CommunicationEventsPanel from '../../components/School/CommunicationEventsPanel';
import ContentModerationPanel from '../../components/School/ContentModerationPanel';

const SchoolAdminPage = () => {
  const [activeFeature, setActiveFeature] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Map features to their corresponding component panels
  const navItems = useMemo(() => [
    { id: 'dashboard', name: 'Dashboard & Analytics', icon: LayoutDashboard, component: DashboardAnalyticsPanel },
    { id: 'oversight', name: 'User & Course Oversight', icon: Users, component: UserCourseOversightPanel },
    { id: 'academic', name: 'Academic Monitoring', icon: BarChart, component: AcademicMonitoringPanel },
    { id: 'communication', name: 'Communication & Events', icon: Bell, component: CommunicationEventsPanel },
    { id: 'content', name: 'Content & Moderation', icon: BookOpen, component: ContentModerationPanel },
  ], []);

  const ActiveComponent = navItems.find(item => item.id === activeFeature)?.component;

  return (
    <div className="h-screen flex bg-gray-50 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        setOpen={setIsSidebarOpen}
        navItems={navItems}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto "
            >
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default SchoolAdminPage;

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  pageViewsByDay: Array<{
    createdAt: string;
    _count: number;
  }>;
  resumeDownloadsByLanguage: Array<{
    language: string;
    _count: number;
  }>;
  contactsByDay: Array<{
    createdAt: string;
    _count: number;
  }>;
}

export function AnalyticsChart() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <BarChart3 className="h-8 w-8 animate-pulse" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>No analytics data available</p>
      </div>
    );
  }

  // Simple bar chart visualization
  const maxPageViews = Math.max(
    ...analyticsData.pageViewsByDay.map(item => item._count),
    1
  );

  return (
    <div className="space-y-6">
      {/* Resume Downloads by Language */}
      <div>
        <h4 className="font-medium mb-3">Resume Downloads by Language</h4>
        <div className="space-y-2">
          {analyticsData.resumeDownloadsByLanguage.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {item.language === 'en' ? 'English' : 'Português'}
              </span>
              <div className="flex items-center space-x-2">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{
                    width: `${(item._count / Math.max(...analyticsData.resumeDownloadsByLanguage.map(d => d._count))) * 100}px`,
                    minWidth: '10px',
                  }}
                />
                <span className="text-sm text-muted-foreground w-8">
                  {item._count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Views Trend */}
      <div>
        <h4 className="font-medium mb-3">Page Views (Last 30 Days)</h4>
        <div className="flex items-end space-x-1 h-32">
          {analyticsData.pageViewsByDay.slice(-7).map((item, index) => (
            <div
              key={index}
              className="bg-green-500 rounded-t min-w-[20px] flex-1 opacity-80 hover:opacity-100 transition-opacity"
              style={{
                height: `${(item._count / maxPageViews) * 100}%`,
                minHeight: item._count > 0 ? '4px' : '1px',
              }}
              title={`${new Date(item.createdAt).toLocaleDateString()}: ${item._count} views`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Showing last 7 days of activity
        </p>
      </div>

      {/* Contacts Trend */}
      <div>
        <h4 className="font-medium mb-3">New Contacts</h4>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium">
              {analyticsData.contactsByDay.reduce((sum, item) => sum + item._count, 0)}
            </span>
            <span className="text-xs text-muted-foreground ml-1">this month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Eye,
  Download,
  MessageSquare,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface AdminStatsProps {
  stats: {
    contacts: {
      total: number;
      lastMonth: number;
      lastWeek: number;
    };
    pageViews: {
      total: number;
      lastMonth: number;
    };
    resumeDownloads: {
      total: number;
    };
    topPages: Array<{
      page: string;
      views: number;
    }>;
  };
}

export function AdminStats({ stats }: AdminStatsProps) {
  const calculateGrowthRate = () => {
    if (stats.contacts.lastMonth === 0) return 0;
    const currentWeekAvg = stats.contacts.lastWeek / 7;
    const monthlyAvg = stats.contacts.lastMonth / 30;
    return Math.round(((currentWeekAvg - monthlyAvg) / monthlyAvg) * 100);
  };

  const growthRate = calculateGrowthRate();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.contacts.total}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{stats.contacts.lastMonth} this month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pageViews.total}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{stats.pageViews.lastMonth} this month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resume Downloads</CardTitle>
          <Download className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.resumeDownloads.total}</div>
          <p className="text-xs text-muted-foreground">All time downloads</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className={`h-4 w-4 ${growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {growthRate > 0 ? '+' : ''}{growthRate}%
          </div>
          <p className="text-xs text-muted-foreground">
            Week over week change
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
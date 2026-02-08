import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { loadJourneyState } from '../journey/state/persistence';
import { getEvents, prepareExportData } from '../tracking/storage';
import { useGetAllActivities } from '../hooks/useQueries';
import { getOrCreateVisitorId } from '../tracking/visitorId';

interface AdminDashboardPageProps {
  onLogout: () => void;
}

interface ParsedActivityEvent {
  userId: string;
  timestamp: number;
  eventType: string;
  details: any;
  visitorId?: string;
}

export function AdminDashboardPage({ onLogout }: AdminDashboardPageProps) {
  const journeyState = loadJourneyState();
  const localEvents = getEvents();
  const { data: backendEvents = [], isLoading, error } = useGetAllActivities();
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [visitorFilter, setVisitorFilter] = useState('');

  // Parse backend events
  const parsedEvents: ParsedActivityEvent[] = backendEvents.map(event => {
    let details: any = {};
    let visitorId: string | undefined;
    
    try {
      details = JSON.parse(event.details);
      visitorId = details.visitorId;
    } catch {
      details = { raw: event.details };
    }

    return {
      userId: event.userId.toString(),
      timestamp: Number(event.timestamp) / 1000000, // Convert from nanoseconds
      eventType: event.eventType,
      details,
      visitorId,
    };
  });

  // Get unique visitors
  const visitors = Array.from(new Set(parsedEvents.map(e => e.visitorId).filter(Boolean))) as string[];
  
  // Filter events by visitor
  const filteredEvents = selectedVisitor
    ? parsedEvents.filter(e => e.visitorId === selectedVisitor)
    : visitorFilter
    ? parsedEvents.filter(e => e.visitorId?.toLowerCase().includes(visitorFilter.toLowerCase()))
    : parsedEvents;

  // Sort by timestamp descending
  const sortedEvents = [...filteredEvents].sort((a, b) => b.timestamp - a.timestamp);

  const handleExport = () => {
    const data = prepareExportData(journeyState, parsedEvents);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journey-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderEventDetails = (event: ParsedActivityEvent) => {
    const { details } = event;
    
    if (event.eventType === 'answer-submitted') {
      return (
        <div className="mt-2 space-y-1">
          <p className="text-sm"><strong>Node:</strong> {details.nodeId}</p>
          {details.selectedOptions && details.selectedOptions.length > 0 && (
            <p className="text-sm"><strong>Options:</strong> {details.selectedOptions.join(', ')}</p>
          )}
          {details.textInputs && Object.keys(details.textInputs).length > 0 && (
            <div className="text-sm">
              <strong>Text Inputs:</strong>
              {Object.entries(details.textInputs).map(([key, value]) => (
                <p key={key} className="ml-4 text-gray-600">
                  {key}: {String(value).substring(0, 100)}
                  {String(value).length > 100 ? '...' : ''}
                </p>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (event.eventType === 'proposal-decision') {
      return (
        <div className="mt-2 space-y-1">
          <p className="text-sm"><strong>Decision:</strong> {details.decision}</p>
          {details.noAttempts !== undefined && (
            <p className="text-sm"><strong>No Attempts:</strong> {details.noAttempts}</p>
          )}
        </div>
      );
    }
    
    if (event.eventType === 'think-flow-step') {
      return (
        <div className="mt-2 space-y-1">
          <p className="text-sm"><strong>Step:</strong> {details.step}</p>
          {details.stepText && (
            <p className="text-sm text-gray-600">
              {details.stepText.substring(0, 150)}
              {details.stepText.length > 150 ? '...' : ''}
            </p>
          )}
        </div>
      );
    }
    
    if (event.eventType === 'node-view') {
      return (
        <div className="mt-2">
          <p className="text-sm"><strong>Node:</strong> {details.nodeId}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {journeyState?.finalDecision === 'yes' ? '✅ YES!' : 
                     journeyState?.finalDecision === 'no' ? '❌ No' :
                     journeyState?.finalDecision === 'think' ? '⏳ Thinking' :
                     journeyState ? '🟡 In Progress' : '⚪ Not Started'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{journeyState?.progress || 0}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backend Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{parsedEvents.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Unique Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{visitors.length}</p>
                </CardContent>
              </Card>
            </div>

            {journeyState && (
              <Card>
                <CardHeader>
                  <CardTitle>Journey Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Started:</strong> {new Date(journeyState.startTime).toLocaleString()}</p>
                  <p><strong>Last Active:</strong> {new Date(journeyState.lastActiveTime).toLocaleString()}</p>
                  <p><strong>Current Node:</strong> {journeyState.currentNodeId}</p>
                  <p><strong>NO Attempts:</strong> {journeyState.noAttempts}</p>
                  <p><strong>Answers Count:</strong> {Object.keys(journeyState.answers).length}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="answers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Answers</CardTitle>
              </CardHeader>
              <CardContent>
                {journeyState && Object.entries(journeyState.answers).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(journeyState.answers).map(([nodeId, answer]) => (
                      <div key={nodeId} className="p-4 border rounded-lg">
                        <p className="font-semibold text-sm text-gray-600 mb-2">{nodeId}</p>
                        <pre className="text-sm bg-gray-50 p-2 rounded overflow-auto">
                          {JSON.stringify(answer.value, null, 2)}
                        </pre>
                        <p className="text-xs text-gray-500 mt-2">
                          Answered: {new Date(answer.timestamp).toLocaleString()} | 
                          Time spent: {Math.round(answer.timeSpent / 1000)}s
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No answers yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Events</CardTitle>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="visitor-filter">Filter by Visitor ID</Label>
                    <Input
                      id="visitor-filter"
                      placeholder="Search visitor ID..."
                      value={visitorFilter}
                      onChange={(e) => {
                        setVisitorFilter(e.target.value);
                        setSelectedVisitor(null);
                      }}
                      className="mt-1"
                    />
                  </div>
                  
                  {visitors.length > 0 && (
                    <div>
                      <Label>Quick Select Visitor</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge
                          variant={selectedVisitor === null ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedVisitor(null);
                            setVisitorFilter('');
                          }}
                        >
                          All Visitors
                        </Badge>
                        {visitors.map(visitorId => (
                          <Badge
                            key={visitorId}
                            variant={selectedVisitor === visitorId ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedVisitor(visitorId);
                              setVisitorFilter('');
                            }}
                          >
                            {visitorId.substring(0, 20)}...
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading && <p className="text-gray-500">Loading backend events...</p>}
                {error && (
                  <p className="text-red-500">
                    Error loading backend events: {error instanceof Error ? error.message : 'Unknown error'}
                  </p>
                )}
                
                {!isLoading && !error && (
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-3">
                      {sortedEvents.length === 0 ? (
                        <p className="text-gray-500">No events found</p>
                      ) : (
                        sortedEvents.map((event, i) => (
                          <div key={i} className="p-4 border rounded-lg bg-white">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">{event.eventType}</Badge>
                                  {event.visitorId && (
                                    <Badge variant="secondary" className="text-xs">
                                      {event.visitorId.substring(0, 15)}...
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mb-2">
                                  {new Date(event.timestamp).toLocaleString()}
                                </p>
                                {renderEventDetails(event)}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                )}
                
                {localEvents.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-3">Local Events (Legacy)</h3>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {localEvents.slice(-50).reverse().map((event, i) => (
                          <div key={i} className="text-sm p-2 border-b">
                            <span className="font-mono text-xs text-gray-500">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </span>
                            {' - '}
                            <span className="font-semibold">{event.type}</span>
                            {event.data && (
                              <span className="text-gray-600 ml-2">
                                {JSON.stringify(event.data).slice(0, 100)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Export includes journey state, local events, and backend activity events.
                </p>
                <Button onClick={handleExport} className="w-full">
                  Download JSON Export
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

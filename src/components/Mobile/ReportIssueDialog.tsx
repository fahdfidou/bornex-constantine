import React, { useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ReportIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stationName: string;
}

const ReportIssueDialog: React.FC<ReportIssueDialogProps> = ({ 
  open, 
  onOpenChange, 
  stationName 
}) => {
  const { t } = useLanguage();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const commonIssues = [
    { id: 'power', label: t('issue.powerProblem'), color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
    { id: 'temperature', label: t('issue.overheating'), color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
    { id: 'charging', label: t('issue.chargingSlow'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { id: 'connector', label: t('issue.connectorProblem'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 'display', label: t('issue.displayError'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
    { id: 'noise', label: t('issue.unusualNoise'), color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400' },
    { id: 'wifi', label: t('issue.connectionProblem'), color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    { id: 'other', label: t('issue.other'), color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' }
  ];

  const toggleIssue = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSubmit = () => {
    if (selectedIssues.length === 0 && !description.trim()) {
      toast({
        title: t('issue.selectOrDescribe'),
        description: t('issue.selectOrDescribeDesc'),
        variant: "destructive",
      });
      return;
    }

    // Simulate report submission
    toast({
      title: t('issue.reportSent'),
      description: t('issue.reportSentDesc'),
    });

    // Reset form
    setSelectedIssues([]);
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            {t('myStation.reportIssue')}
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {stationName}
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {t('issue.commonProblems')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {commonIssues.map(issue => (
                <Badge
                  key={issue.id}
                  variant={selectedIssues.includes(issue.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedIssues.includes(issue.id) ? issue.color : ''
                  }`}
                  onClick={() => toggleIssue(issue.id)}
                >
                  {issue.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('issue.additionalDetails')}
            </h3>
            <Textarea
              placeholder={t('issue.describeIssue')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {t('issue.sendReport')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportIssueDialog;
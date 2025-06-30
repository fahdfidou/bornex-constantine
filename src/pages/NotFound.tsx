
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
          
          <Button 
            onClick={() => window.location.href = "/"}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

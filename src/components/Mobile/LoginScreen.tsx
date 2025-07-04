import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Phone, Mail, Lock, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (userData: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLogin }) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    phone: ''
  });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = () => {
    // Simuler la connexion
    const userData = {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: loginData.email || 'jean.dupont@email.com',
      phone: loginData.phone || '+213 555 123 456',
      avatar: null
    };
    onLogin(userData);
  };

  const handleRegister = () => {
    // Simuler l'inscription
    const userData = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      phone: registerData.phone,
      avatar: null
    };
    onLogin(userData);
  };

  const handleGoogleLogin = () => {
    // Simuler la connexion Google
    const userData = {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@gmail.com',
      phone: '+213 555 123 456',
      avatar: null
    };
    onLogin(userData);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('auth.welcome')}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-white">
                {t('auth.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
                  <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">{t('auth.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="exemple@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">{t('auth.password')}</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          placeholder="••••••••"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {t('auth.loginWithEmail')}
                    </Button>

                    <div className="relative">
                      <Separator />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-xs text-gray-500">
                        {t('auth.or')}
                      </span>
                    </div>

                    <div>
                      <Label htmlFor="phone">{t('auth.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={loginData.phone}
                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                        placeholder="+213 555 123 456"
                      />
                    </div>

                    <Button 
                      onClick={handleLogin}
                      variant="outline"
                      className="w-full"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {t('auth.loginWithPhone')}
                    </Button>

                    <Button 
                      onClick={handleGoogleLogin}
                      variant="outline"
                      className="w-full"
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t('auth.loginWithGoogle')}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                        <Input
                          id="firstName"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                        <Input
                          id="lastName"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          placeholder="Dupont"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="regEmail">{t('auth.email')}</Label>
                      <Input
                        id="regEmail"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="exemple@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="regPhone">{t('auth.phone')}</Label>
                      <Input
                        id="regPhone"
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        placeholder="+213 555 123 456"
                      />
                    </div>

                    <div>
                      <Label htmlFor="regPassword">{t('auth.password')}</Label>
                      <Input
                        id="regPassword"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>

                    <Button 
                      onClick={handleRegister}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t('auth.createAccount')}
                    </Button>

                    <div className="relative">
                      <Separator />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-xs text-gray-500">
                        {t('auth.or')}
                      </span>
                    </div>

                    <Button 
                      onClick={handleGoogleLogin}
                      variant="outline"
                      className="w-full"
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {t('auth.registerWithGoogle')}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
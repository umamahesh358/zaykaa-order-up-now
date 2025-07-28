import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Phone, Shield, ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'phone' | 'otp' | 'welcome';

interface LockScreenProps {
  onAuthenticated: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onAuthenticated }) => {
  const [step, setStep] = useState<Step>('phone');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validatePhoneNumber = (phone: string): boolean => {
    // Indian phone number validation (10 digits)
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phone);
  };

  const handleSendOTP = async () => {
    setError('');
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Enter a valid number.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: `${countryCode}${phoneNumber}` }),
      });

      if (response.ok) {
        setStep('otp');
        toast({
          title: 'OTP Sent',
          description: 'Please check your phone for the verification code.',
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: `${countryCode}${phoneNumber}`, 
          code: otp 
        }),
      });

      if (response.ok) {
        setStep('welcome');
        toast({
          title: 'Verification Successful',
          description: 'Welcome to Zaykaa!',
        });
      } else {
        setError('Invalid code. Please try again.');
        setOtp('');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
  };

  // Welcome page handler
  const handleEnterApp = () => {
    onAuthenticated();
  };

  // Welcome page content
  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-yellow-300">Zaykaa</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Authentic flavors delivered fresh to your doorstep
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
                  onClick={handleEnterApp}
                >
                  Enter App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <a href="https://wa.me/918639378049" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white font-semibold text-lg px-8 text-orange-500">
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Hot, fresh food delivered in 30-45 minutes
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
                <p className="text-muted-foreground">
                  Made with fresh ingredients and authentic spices
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
                <p className="text-muted-foreground">
                  Serving across Delhi NCR with love
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our delicious menu filled with authentic Indian flavors
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-lg font-semibold text-lg px-8"
              onClick={handleEnterApp}
            >
              Enter Zaykaa App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-foreground/20 to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
            {step === 'phone' ? (
              <Phone className="h-8 w-8 text-white" />
            ) : (
              <Shield className="h-8 w-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {step === 'phone' ? 'Enter Phone Number' : 'Verify OTP'}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {step === 'phone' 
              ? 'We\'ll send you a verification code' 
              : `Code sent to ${countryCode}${phoneNumber}`
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 'phone' ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country-code">Country Code</Label>
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">🇮🇳 +91 (India)</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1 (USA)</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44 (UK)</SelectItem>
                      <SelectItem value="+971">🇦🇪 +971 (UAE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="h-12 text-base"
                    maxLength={10}
                  />
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm text-center font-medium">{error}</p>
              )}

              <Button 
                onClick={handleSendOTP}
                disabled={loading || !phoneNumber}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-center block">Enter 6-digit code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm text-center font-medium">{error}</p>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>

                <Button 
                  onClick={handleBackToPhone}
                  variant="outline"
                  className="w-full h-10 text-sm"
                  disabled={loading}
                >
                  Change Number
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Phone, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'phone' | 'otp';

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
        toast({
          title: 'Verification Successful',
          description: 'Welcome to Zaykaa!',
        });
        onAuthenticated();
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
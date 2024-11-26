import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ScanTarget } from '@/services/security/ScanningService'

interface ScanConfigurationFormProps {
  onSubmit: (config: ScanTarget) => void
  isLoading: boolean
}

export function ScanConfigurationForm({ onSubmit, isLoading }: ScanConfigurationFormProps) {
  const [scanType, setScanType] = useState<'web' | 'api' | 'mobile' | 'network'>('web')
  const [target, setTarget] = useState('')
  const [authEnabled, setAuthEnabled] = useState(false)
  const [authType, setAuthType] = useState<'basic' | 'bearer' | 'apiKey'>('bearer')
  const [credentials, setCredentials] = useState('')
  const [excludePaths, setExcludePaths] = useState('')
  const [maxDepth, setMaxDepth] = useState('10')
  const [rateLimit, setRateLimit] = useState('100')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const config: ScanTarget = {
      type: scanType,
      target,
      options: {
        ...(authEnabled && {
          auth: {
            type: authType,
            credentials
          }
        }),
        scope: [],
        excludePaths: excludePaths.split('\n').filter(Boolean),
        maxDepth: parseInt(maxDepth),
        rateLimit: parseInt(rateLimit)
      }
    }
    onSubmit(config)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Configuration</CardTitle>
        <CardDescription>Configure your security scan parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Scan Type</Label>
            <Select value={scanType} onValueChange={(value: any) => setScanType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select scan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web Application</SelectItem>
                <SelectItem value="api">API Endpoint</SelectItem>
                <SelectItem value="mobile">Mobile Application</SelectItem>
                <SelectItem value="network">Network Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Target {scanType === 'web' && '(URL)'} {scanType === 'api' && '(Spec File/URL)'} {scanType === 'mobile' && '(APK/IPA File)'} {scanType === 'network' && '(IP/Range)'}</Label>
            <Input 
              placeholder={
                scanType === 'web' ? 'https://example.com' :
                scanType === 'api' ? './openapi.yaml or https://api.example.com' :
                scanType === 'mobile' ? './app.apk' :
                '192.168.1.0/24'
              }
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={authEnabled}
              onCheckedChange={setAuthEnabled}
            />
            <Label>Enable Authentication</Label>
          </div>

          {authEnabled && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Authentication Type</Label>
                <Select value={authType} onValueChange={(value: any) => setAuthType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select auth type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bearer">Bearer Token</SelectItem>
                    <SelectItem value="basic">Basic Auth</SelectItem>
                    <SelectItem value="apiKey">API Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Credentials</Label>
                <Input
                  type="password"
                  placeholder="Enter credentials"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Exclude Paths (one per line)</Label>
            <Textarea
              placeholder="/health&#10;/metrics"
              value={excludePaths}
              onChange={(e) => setExcludePaths(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Depth</Label>
              <Input
                type="number"
                min="1"
                value={maxDepth}
                onChange={(e) => setMaxDepth(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Rate Limit (req/s)</Label>
              <Input
                type="number"
                min="1"
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Starting Scan...' : 'Start Scan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

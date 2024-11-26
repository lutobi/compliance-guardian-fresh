import { VulnerabilityScanner } from '@/components/scanner/VulnerabilityScanner'
import { PageHeader } from '@/components/common/PageHeader'

export default function VulnerabilityScannerPage() {
  return (
    <div>
      <PageHeader
        heading="Vulnerability Scanner"
        subheading="Scan and identify security vulnerabilities across your infrastructure"
      />
      <div className="mt-6">
        <VulnerabilityScanner />
      </div>
    </div>
  )
}

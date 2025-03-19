# Blockchain-Enabled Flood Control Infrastructure Management

A decentralized system for transparent, efficient, and accountable management of critical flood control infrastructure including levees, dams, and pumping stations.

## Overview

This project implements a suite of smart contracts to ensure the reliability and effectiveness of flood control infrastructure through transparent registration, inspection, maintenance, and performance monitoring. By leveraging blockchain technology, we create an immutable and auditable record of infrastructure assets and their lifecycle management, enhancing public safety and trust in flood control systems.

## Key Features

- **Comprehensive asset registry** - Transparent documentation of all flood control infrastructure
- **Immutable inspection records** - Tamper-proof history of infrastructure assessments
- **Coordinated maintenance** - Efficient scheduling and verification of repair activities
- **Performance analytics** - Real-time and historical data on infrastructure effectiveness
- **Stakeholder accountability** - Clear responsibility tracking for public agencies and contractors
- **Disaster preparedness** - Improved readiness for flood events through data-driven management

## Smart Contracts

### 1. Asset Registration Contract

Manages the comprehensive registry of flood control infrastructure and their specifications.

**Functionality:**
- Infrastructure registration with detailed specifications
- Geolocation and coverage area mapping
- Capacity and design parameters documentation
- Construction and installation verification
- Compliance certification with engineering standards
- Ownership and jurisdiction management
- Historical modifications tracking

### 2. Inspection Tracking Contract

Records and verifies regular assessments of flood control infrastructure.

**Functionality:**
- Inspection scheduling based on risk assessment
- Inspector credential verification
- Comprehensive inspection checklist management
- Severity classification of identified issues
- Photo and documentation storage
- Regulatory compliance verification
- Historical inspection records

### 3. Maintenance Scheduling Contract

Coordinates and verifies maintenance activities for flood control infrastructure.

**Functionality:**
- Maintenance task creation and prioritization
- Contractor assignment and verification
- Parts and materials tracking
- Work verification and quality control
- Budget and cost tracking
- Maintenance history for each asset
- Emergency repair fast-tracking

### 4. Performance Monitoring Contract

Tracks the effectiveness of flood control infrastructure during normal conditions and flood events.

**Functionality:**
- Real-time sensor data integration
- Performance metrics calculation
- Threshold alerting and notification
- Historical performance analysis
- Event response documentation
- Capacity utilization tracking
- Failure analysis and improvement recommendations

## Technical Architecture

The system combines on-chain and off-chain components:

- **Blockchain Layer**: Ethereum-based smart contracts for core functionality
- **User Interface**: Web application for infrastructure managers and the public
- **Data Storage**: IPFS for inspection reports, images, and technical documentation
- **IoT Integration**: Oracle services connecting real-time sensor data to smart contracts
- **Analytics Engine**: Off-chain processing of performance data with on-chain verification
- **Weather API**: Integration with meteorological data for contextual analysis

## Getting Started

### Prerequisites

- Node.js (v16+)
- Truffle Suite
- MetaMask or similar web3 wallet
- Ganache (for local development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/flood-control-blockchain.git
   cd flood-control-blockchain
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile smart contracts:
   ```
   truffle compile
   ```

4. Deploy to local network:
   ```
   truffle migrate --reset
   ```

### Testing

Run the automated test suite:
```
truffle test
```

## Deployment

### Local Development
1. Start Ganache local blockchain
2. Deploy contracts with `truffle migrate`
3. Connect MetaMask to your local Ganache instance
4. Run the front-end with `npm start`

### Testnet/Mainnet Deployment
1. Configure your `.env` file with appropriate network credentials
2. Run `truffle migrate --network [network_name]`
3. Verify contracts on Etherscan

## Usage Examples

### Registering a Flood Control Asset

```javascript
// Connect to the asset registration contract
const assetContract = await AssetRegistration.deployed();

// Register a new levee
await assetContract.registerAsset(
  "North River Levee Section A",
  ASSET_TYPE_LEVEE,
  "QmW2WQi7j...",  // IPFS hash of technical specifications
  [37.7749, -122.4194],  // Geolocation coordinates
  constructionDate,
  "QmR5Tf3k...",  // IPFS hash of engineering certification
  { from: agencyAddress }
);
```

### Scheduling an Inspection

```javascript
// Connect to the inspection tracking contract
const inspectionContract = await InspectionTracking.deployed();

// Schedule a new inspection
await inspectionContract.scheduleInspection(
  assetId,
  inspectionDate,
  inspectorId,
  INSPECTION_TYPE_ANNUAL,
  RISK_LEVEL_MODERATE,
  { from: managerAddress }
);
```

### Recording Maintenance

```javascript
// Connect to the maintenance scheduling contract
const maintenanceContract = await MaintenanceScheduling.deployed();

// Record completed maintenance
await maintenanceContract.completeMaintenance(
  maintenanceTaskId,
  "QmT2WQ...",  // IPFS hash of maintenance documentation
  completionDate,
  cost,
  { from: contractorAddress }
);
```

### Recording Performance During a Flood Event

```javascript
// Connect to the performance monitoring contract
const performanceContract = await PerformanceMonitoring.deployed();

// Record performance data
await performanceContract.recordFloodEvent(
  assetId,
  eventStartDate,
  eventEndDate,
  maxWaterLevel,
  "QmL7PQ...",  // IPFS hash of event documentation
  performanceRating,
  { from: authorizedMonitorAddress }
);
```

## Stakeholder Benefits

### For Government Agencies
- Transparent asset management
- Improved maintenance coordination
- Objective performance metrics
- Enhanced disaster preparedness
- Increased public trust

### For Engineers and Contractors
- Clear specifications and requirements
- Streamlined inspection and maintenance processes
- Verifiable work history
- Simplified compliance documentation

### For Community and Public
- Transparency into infrastructure condition
- Confidence in flood protection systems
- Public accountability for responsible agencies
- Historical performance data accessibility

## Data Visualization and Reporting

The system provides various dashboards and reports:

- **Asset Map**: Geographic visualization of all infrastructure
- **Condition Heatmap**: Color-coded representation of asset conditions
- **Maintenance Calendar**: Timeline of scheduled and completed maintenance
- **Performance Analytics**: Historical effectiveness during flood events
- **Compliance Dashboard**: Regulatory compliance status for all assets

## Future Development

- Integration with advanced weather prediction models
- Machine learning for predictive maintenance
- Automated drone inspection integration
- Cross-jurisdictional coordination features
- Citizen reporting and feedback mechanisms
- Climate change adaptation planning tools

## Security and Governance

The system implements a robust security and governance model:

- Role-based access control for different stakeholders
- Multi-signature requirements for critical actions
- Audit trails for all system interactions
- Transparent decision-making processes
- Community oversight mechanisms

## Contributing

We welcome contributions to the Blockchain-Enabled Flood Control Infrastructure Management project!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the National Flood Control Association for domain expertise
- Built with support from the Resilient Infrastructure Initiative
- Special thanks to the civil engineers and emergency management professionals who provided feedback during development

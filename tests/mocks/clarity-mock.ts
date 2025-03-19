import { vi } from "vitest"

/**
 * Creates a mock Clarity environment for testing Clarity contracts
 */
export function mockClarity() {
	// Mock storage for contract data
	const storage = new Map()
	
	// Mock blockchain state
	let blockHeight = 0
	let txSender = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
	
	// Reset the mock state
	const reset = () => {
		storage.clear()
		blockHeight = 0
		txSender = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
	}
	
	// Set the current block height
	const setBlockHeight = (height) => {
		blockHeight = height
	}
	
	// Advance the block height by a specified amount
	const advanceBlockHeight = (amount) => {
		blockHeight += amount
	}
	
	// Set the transaction sender
	const setTxSender = (address) => {
		txSender = address
	}
	
	// Mock contract import
	const importContract = (path) => {
		// This would normally load and parse the contract
		// For testing, we'll return a mock implementation based on the path
		
		// Extract contract name from path
		const contractName = path.split("/").pop().replace(".clar", "")
		
		// Create mock implementations for each contract
		const mockImplementations = {
			"asset-registration": {
				registerAsset: vi.fn((assetType, location, constructionDate, capacity) => {
					const assetId = (storage.get("lastAssetId") || 0) + 1
					storage.set("lastAssetId", assetId)
					
					storage.set(`asset-${assetId}`, {
						assetType,
						location,
						constructionDate,
						capacity,
						lastUpdated: blockHeight,
						status: "active",
					})
					
					return { success: true, value: assetId }
				}),
				
				updateAssetStatus: vi.fn((assetId, newStatus) => {
					const asset = storage.get(`asset-${assetId}`)
					if (!asset) {
						return { success: false, error: 404 }
					}
					
					asset.status = newStatus
					asset.lastUpdated = blockHeight
					storage.set(`asset-${assetId}`, asset)
					
					return { success: true }
				}),
				
				getAsset: vi.fn((assetId) => {
					return storage.get(`asset-${assetId}`)
				}),
				
				getLastAssetId: vi.fn(() => {
					return storage.get("lastAssetId") || 0
				}),
			},
			
			"inspection-tracking": {
				recordInspection: vi.fn((assetId, rating, notes, nextInspection) => {
					const inspectionId = (storage.get("lastInspectionId") || 0) + 1
					storage.set("lastInspectionId", inspectionId)
					
					const inspection = {
						assetId,
						inspector: txSender,
						date: blockHeight,
						rating,
						notes,
						nextInspection,
					}
					
					storage.set(`inspection-${inspectionId}`, inspection)
					storage.set(`asset-last-inspection-${assetId}`, inspectionId)
					
					return { success: true, value: inspectionId }
				}),
				
				getInspection: vi.fn((inspectionId) => {
					return storage.get(`inspection-${inspectionId}`)
				}),
				
				getAssetLastInspection: vi.fn((assetId) => {
					const lastInspectionId = storage.get(`asset-last-inspection-${assetId}`)
					if (!lastInspectionId) return null
					
					return storage.get(`inspection-${lastInspectionId}`)
				}),
				
				getDueInspections: vi.fn((currentBlock) => {
					const inspections = []
					
					// Find all inspections in storage
					for (const [key, value] of storage.entries()) {
						if (key.startsWith("inspection-")) {
							if (value.nextInspection <= currentBlock) {
								inspections.push(value)
							}
						}
					}
					
					return inspections
				}),
			},
			
			"maintenance-scheduling": {
				createMaintenanceTask: vi.fn((assetId, description, priority, scheduledDate, assignedTo) => {
					const taskId = (storage.get("lastTaskId") || 0) + 1
					storage.set("lastTaskId", taskId)
					
					const task = {
						assetId,
						description,
						priority,
						scheduledDate,
						completed: false,
						assignedTo,
						createdBy: txSender,
						createdAt: blockHeight,
						completedAt: null,
					}
					
					storage.set(`task-${taskId}`, task)
					
					// Add to asset's pending tasks
					let pendingTasks = storage.get(`asset-pending-tasks-${assetId}`) || []
					pendingTasks.push(taskId)
					if (pendingTasks.length > 10) pendingTasks = pendingTasks.slice(-10)
					storage.set(`asset-pending-tasks-${assetId}`, pendingTasks)
					
					return { success: true, value: taskId }
				}),
				
				completeMaintenanceTask: vi.fn((taskId) => {
					const task = storage.get(`task-${taskId}`)
					if (!task) {
						return { success: false, error: 404 }
					}
					
					task.completed = true
					task.completedAt = blockHeight
					storage.set(`task-${taskId}`, task)
					
					// Remove from asset's pending tasks
					const assetId = task.assetId
					let pendingTasks = storage.get(`asset-pending-tasks-${assetId}`) || []
					pendingTasks = pendingTasks.filter((id) => id !== taskId)
					storage.set(`asset-pending-tasks-${assetId}`, pendingTasks)
					
					return { success: true }
				}),
				
				getMaintenanceTask: vi.fn((taskId) => {
					return storage.get(`task-${taskId}`)
				}),
				
				getAssetPendingTasks: vi.fn((assetId) => {
					return storage.get(`asset-pending-tasks-${assetId}`) || []
				}),
				
				getHighPriorityTasks: vi.fn(() => {
					const highPriorityTasks = []
					
					// Find all tasks in storage
					for (const [key, value] of storage.entries()) {
						if (key.startsWith("task-")) {
							if (value.priority >= 8 && !value.completed) {
								highPriorityTasks.push(value)
							}
						}
					}
					
					return highPriorityTasks
				}),
			},
			
			"performance-monitoring": {
				registerFloodEvent: vi.fn((severity, affectedArea) => {
					const eventId = (storage.get("lastEventId") || 0) + 1
					storage.set("lastEventId", eventId)
					
					const event = {
						startDate: blockHeight,
						endDate: null,
						severity,
						affectedArea,
						active: true,
					}
					
					storage.set(`event-${eventId}`, event)
					
					return { success: true, value: eventId }
				}),
				
				closeFloodEvent: vi.fn((eventId) => {
					const event = storage.get(`event-${eventId}`)
					if (!event) {
						return { success: false, error: 404 }
					}
					
					event.endDate = blockHeight
					event.active = false
					storage.set(`event-${eventId}`, event)
					
					return { success: true }
				}),
				
				recordAssetPerformance: vi.fn(
					(eventId, assetId, effectivenessRating, issues, waterLevelMax, operationalStatus) => {
						const performance = {
							effectivenessRating,
							issuesReported: issues,
							waterLevelMax,
							operationalStatus,
						}
						
						storage.set(`performance-${eventId}-${assetId}`, performance)
						
						return { success: true }
					},
				),
				
				getFloodEvent: vi.fn((eventId) => {
					return storage.get(`event-${eventId}`)
				}),
				
				getActiveFloodEvents: vi.fn(() => {
					const activeEvents = []
					
					// Find all events in storage
					for (const [key, value] of storage.entries()) {
						if (key.startsWith("event-")) {
							if (value.active) {
								activeEvents.push(value)
							}
						}
					}
					
					return activeEvents
				}),
				
				getAssetPerformance: vi.fn((eventId, assetId) => {
					return storage.get(`performance-${eventId}-${assetId}`)
				}),
			},
		}
		
		return mockImplementations[contractName] || {}
	}
	
	return {
		reset,
		setBlockHeight,
		advanceBlockHeight,
		setTxSender,
		importContract,
		get blockHeight() {
			return blockHeight
		},
	}
}


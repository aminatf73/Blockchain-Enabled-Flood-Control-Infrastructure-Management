import { describe, it, expect, beforeEach } from "vitest"
import { mockClarity } from "./mocks/clarity-mock"

// Mock the Clarity environment
const clarity = mockClarity()

// Import the contract under test
const assetRegistration = clarity.importContract("./contracts/asset-registration.clar")

describe("Asset Registration Contract", () => {
  beforeEach(() => {
    // Reset contract state before each test
    clarity.reset()
  })
  
  it("should register a new asset", async () => {
    // Arrange
    const assetType = "dam"
    const location = "River Valley"
    const constructionDate = 20100101
    const capacity = 5000000
    
    // Act
    const result = await assetRegistration.registerAsset(assetType, location, constructionDate, capacity)
    
    // Assert
    expect(result.success).toBe(true)
    expect(result.value).toBe(1) // First asset ID should be 1
    
    // Verify asset was stored correctly
    const asset = await assetRegistration.getAsset(1)
    expect(asset).toEqual({
      assetType,
      location,
      constructionDate,
      capacity,
      lastUpdated: clarity.blockHeight,
      status: "active",
    })
  })
  
  it("should update an asset status", async () => {
    // Arrange - First register an asset
    await assetRegistration.registerAsset("levee", "Coastal Area", 20150505, 2000000)
    
    // Act - Update its status
    const result = await assetRegistration.updateAssetStatus(1, "maintenance")
    
    // Assert
    expect(result.success).toBe(true)
    
    // Verify status was updated
    const asset = await assetRegistration.getAsset(1)
    expect(asset.status).toBe("maintenance")
    expect(asset.lastUpdated).toBe(clarity.blockHeight)
  })
  
  it("should fail to update a non-existent asset", async () => {
    // Act
    const result = await assetRegistration.updateAssetStatus(999, "inactive")
    
    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe(404)
  })
  
  it("should return the correct last asset ID", async () => {
    // Arrange - Register multiple assets
    await assetRegistration.registerAsset("dam", "Location 1", 20100101, 1000000)
    await assetRegistration.registerAsset("pump", "Location 2", 20120202, 500000)
    await assetRegistration.registerAsset("levee", "Location 3", 20150303, 750000)
    
    // Act
    const lastId = await assetRegistration.getLastAssetId()
    
    // Assert
    expect(lastId).toBe(3)
  })
})


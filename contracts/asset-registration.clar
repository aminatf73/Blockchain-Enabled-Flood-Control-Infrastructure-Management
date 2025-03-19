;; Asset Registration Contract
;; Records details of levees, dams, and pumps

(define-data-var last-asset-id uint u0)

(define-map assets
  { asset-id: uint }
  {
    asset-type: (string-ascii 20),
    location: (string-ascii 100),
    construction-date: uint,
    capacity: uint,
    last-updated: uint,
    status: (string-ascii 20)
  }
)

(define-public (register-asset (asset-type (string-ascii 20)) (location (string-ascii 100)) (construction-date uint) (capacity uint))
  (let
    (
      (new-id (+ (var-get last-asset-id) u1))
    )
    (map-set assets
      { asset-id: new-id }
      {
        asset-type: asset-type,
        location: location,
        construction-date: construction-date,
        capacity: capacity,
        last-updated: block-height,
        status: "active"
      }
    )
    (var-set last-asset-id new-id)
    (ok new-id)
  )
)

(define-public (update-asset-status (asset-id uint) (new-status (string-ascii 20)))
  (let
    (
      (asset (unwrap! (map-get? assets { asset-id: asset-id }) (err u404)))
    )
    (map-set assets
      { asset-id: asset-id }
      (merge asset {
        status: new-status,
        last-updated: block-height
      })
    )
    (ok true)
  )
)

(define-read-only (get-asset (asset-id uint))
  (map-get? assets { asset-id: asset-id })
)

(define-read-only (get-last-asset-id)
  (var-get last-asset-id)
)


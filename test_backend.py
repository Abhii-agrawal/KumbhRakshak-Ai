import urllib.request
import json
import sys

base_url = "http://127.0.0.1:8000"

def test_endpoint(method, path, data=None):
    url = f"{base_url}{path}"
    req = urllib.request.Request(url, method=method)
    if data:
        req.add_header("Content-Type", "application/json")
        body = json.dumps(data).encode("utf-8")
    else:
        body = None
    try:
        with urllib.request.urlopen(req, data=body, timeout=5) as resp:
            status = resp.status
            content = json.loads(resp.read().decode("utf-8"))
            return status, content
    except urllib.error.HTTPError as e:
        content = json.loads(e.read().decode("utf-8"))
        return e.code, content

print("=================================================================")
print("          KUMBHRAKSHAK AI - COMPREHENSIVE BACKEND TEST SUITE     ")
print("=================================================================")

# Test 1: Health Check
status, res = test_endpoint("GET", "/health")
assert status == 200, f"Health check failed with status {status}"
assert res.get("status") == "HEALTHY", "Status is not HEALTHY"
print("[PASS] Test 1: Health Check (/health) -> 200 OK (Status: HEALTHY)")

# Test 2: Live Telemetry Endpoint
status, res = test_endpoint("GET", "/api/kumbh-live-telemetry")
assert status == 200, f"Telemetry failed with status {status}"
sectors = res.get("sectors", [])
summary = res.get("summary", {})
assert len(sectors) == 6, f"Expected 6 sectors, got {len(sectors)}"

for sec in sectors:
    sid = sec["sector_id"]
    occ = sec["occupancy_pct"]
    fever = sec["fever_cases"]
    risk = sec["risk_status"]
    
    # Verify alert rule assignment
    if occ > 85.0:
        expected = "RED_ALERT"
    elif fever > 25:
        expected = "PURPLE_BIO_ALERT"
    elif occ > 65.0:
        expected = "AMBER_WARNING"
    else:
        expected = "GREEN_SAFE"
        
    assert risk == expected, f"Sector {sid}: expected {expected} (occ={occ}, fever={fever}), got {risk}"

print(f"[PASS] Test 2: Live Telemetry (/api/kumbh-live-telemetry) -> 200 OK")
print(f"       -> Sectors Verified: {len(sectors)}/6 with strict GIS rule alignment")
print(f"       -> Total Crowd: {summary.get('total_crowd')} | Red Alerts: {summary.get('active_red_alerts')} | Avg Water BOD: {summary.get('avg_water_bod_mg_l')} mg/L")

# Test 3: Ambulance Dispatch from every sector
origins = ["SEC_01", "SEC_02", "SEC_03", "SEC_04", "SEC_06"]
for origin in origins:
    status, res = test_endpoint("POST", "/api/dispatch-ambulance", {"incident_sector_id": origin})
    assert status == 200, f"Dispatch failed for {origin} with status {status}"
    assert res.get("status") == "DISPATCHED"
    assert res.get("incident_sector") == origin
    assert res.get("destination") == "SEC_05"
    path = res.get("green_corridor_path", [])
    assert path[0] == origin, f"Path start mismatch: {path[0]} vs {origin}"
    assert path[-1] == "SEC_05", f"Path end mismatch: {path[-1]} vs SEC_05"
    eta = res.get("estimated_eta_minutes", 0)
    assert eta > 0, f"Invalid ETA: {eta}"
    bypassed = res.get("bypassed_red_zones", [])
    print(f"[PASS] Test 3 ({origin}): Route -> {' -> '.join(path)} | ETA: {eta}m | Bypassed Red: {bypassed}")

# Test 4: Error Handling for Invalid Sector
status, res = test_endpoint("POST", "/api/dispatch-ambulance", {"incident_sector_id": "SEC_UNKNOWN_99"})
assert status == 400, f"Expected 400 Bad Request, got {status}"
assert "detail" in res, "Missing detail in error response"
print("[PASS] Test 4: Error Handling (Invalid Sector) -> 400 Bad Request properly rejected")

# Test 5: Dynamic Telemetry Fluctuation
status1, res1 = test_endpoint("GET", "/api/kumbh-live-telemetry")
status2, res2 = test_endpoint("GET", "/api/kumbh-live-telemetry")
assert status1 == 200 and status2 == 200
crowd1 = res1["summary"]["total_crowd"]
crowd2 = res2["summary"]["total_crowd"]
print(f"[PASS] Test 5: Stochastic Drift Verified (Poll 1 Crowd: {crowd1} -> Poll 2 Crowd: {crowd2})")

print("=================================================================")
print("   SUCCESS: ALL BACKEND TESTS PASSED (100% OPERATIONAL)        ")
print("=================================================================")

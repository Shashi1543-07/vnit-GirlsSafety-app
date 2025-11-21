// Native fetch is available in Node 18+

async function testAuth() {
    const baseUrl = 'http://localhost:3000/api/auth';

    const user = {
        name: "Test Student",
        email: `test${Date.now()}@vnit.ac.in`, // Unique email
        password: "password123",
        phone: "9876543210",
        enrollmentNo: `BT21CSE${Date.now()}`, // Unique enrollment
        studentId: `ID${Date.now()}`, // Unique ID
        hostelName: "Gargi",
        roomNo: "101",
        emergencyContact: "9998887776",
        bloodGroup: "B+"
    };

    console.log("1. Testing Registration...");
    try {
        const regRes = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        const regData = await regRes.json();
        console.log(`Status: ${regRes.status}`);
        console.log('Response:', regData);

        if (regRes.status === 201) {
            console.log("\n2. Testing Login...");
            const loginRes = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });

            const loginData = await loginRes.json();
            console.log(`Status: ${loginRes.status}`);
            console.log('Response:', loginData);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

testAuth();

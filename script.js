// Extended GCD function
function extendedGCD(a, b) {
    if (a === 0n) return [b, 0n, 1n];
    const [gcd, x1, y1] = extendedGCD(b % a, a);
    const x = y1 - (b / a) * x1;
    const y = x1;
    return [gcd, x, y];
}

// Function to calculate modular inverse
function modInverse(b, m) {
    let [gcd, x, y] = extendedGCD(b % m, m);
    if (gcd !== 1n) return null; // Modular inverse doesn't exist
    return (x % m + m) % m; // Ensure positive result
}

// Event listener for the form submission
document.getElementById('decryptForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Read inputs and convert to BigInt
    const N = BigInt(document.getElementById('N').value.trim());
    const e1 = parseInt(document.getElementById('e1').value.trim());
    const e2 = parseInt(document.getElementById('e2').value.trim());
    const c1 = BigInt(document.getElementById('c1').value.trim());
    const c2 = BigInt(document.getElementById('c2').value.trim());

    // Calculate d1 and d2
    const [gcd, d1, d2] = extendedGCD(BigInt(e1), BigInt(e2));

    // Convert d2 to a positive equivalent
    let d2Positive = d2 < 0n ? d2 + (N - 1n) : d2;

    // Calculate m
    const c1d1 = c1 ** BigInt(d1) % N; // c1^d1 mod N
    const c2Inverse = modInverse(c2, N); // c2^-1 mod N
    const m = (c1d1 * c2Inverse) % N; // m ≡ (c1^d1 * c2^-1) mod N

    // Convert m to string (bytes)
    const mBytes = m.toString(16);
    const result = hexToString(mBytes);

    document.getElementById('result').innerText = result;
});

// Function to convert hex to string
function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

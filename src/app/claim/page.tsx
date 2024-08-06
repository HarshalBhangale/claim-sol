// // 'use client'
// // import React, { useState, useEffect } from 'react';
// // import dynamic from 'next/dynamic';
// // import { useWallet } from '@solana/wallet-adapter-react';
// // import useSWR from 'swr';

// // const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), {
// //     ssr: false,
// // });

// // const fetcher = (url) => fetch(url).then((res) => res.json());

// // const ClaimPage = () => {
// //     const [ethWallet, setEthWallet] = useState('');
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');
// //     const { publicKey, signMessage, connected } = useWallet();

// //     const { data, error: fetchError, mutate } = useSWR(
// //         connected ? `/api/getEthWallet?solAddress=${publicKey?.toBase58()}` : null,
// //         fetcher
// //     );

// //     useEffect(() => {
// //         if (data && data.ethWallet) {
// //             setEthWallet(data.ethWallet);
// //         }
// //     }, [data]);

// //     const handleSave = async () => {
// //         if (!connected) {
// //             setError('Please connect your wallet first.');
// //             return;
// //         }

// //         if (!signMessage) {
// //             setError('This wallet does not support message signing.');
// //             return;
// //         }

// //         const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${ethWallet}, your Solana wallet: ${publicKey.toBase58()}`;
// //         const encodedMessage = new TextEncoder().encode(message);

// //         try {
// //             const signature = await signMessage(encodedMessage);
// //             const response = await fetch('/api/saveWallets', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     sol: publicKey.toBase58(),
// //                     eth: ethWallet,
// //                     sig: Buffer.from(signature).toString('base64'),
// //                 }),
// //             });

// //             if (response.ok) {
// //                 setSuccess('Successfully saved');
// //                 mutate(); // Refresh the data
// //             } else {
// //                 const errorData = await response.json();
// //                 setError(errorData.message || 'Failed to save. Please try again.');
// //             }
// //         } catch (error) {
// //             console.error('Failed to sign message:', error);
// //             setError(`Failed to sign the message: ${error.message}`);
// //         }
// //     };

// //     return (
// //         <div style={{ margin: '20px' }}>
// //             <h1>Claim Tokens</h1>
// //             <input
// //                 type="text"
// //                 placeholder="Your ETH Wallet to receive tokens"
// //                 value={ethWallet}
// //                 onChange={(e) => setEthWallet(e.target.value)}
// //                 style={{ padding: '10px', margin: '10px 0', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
// //             />
// //             <div className="wallet-connect" style={{ margin: '10px 0' }}>
// //                 <WalletMultiButton />
// //             </div>
// //             {connected && publicKey && (
// //                 <div style={{ marginTop: '10px', fontSize: '16px' }}>
// //                     <strong>Your connected wallet:</strong> {publicKey.toBase58().substring(0, 4)}...{publicKey.toBase58().slice(-4)}
// //                 </div>
// //             )}
// //             <button
// //                 onClick={handleSave}
// //                 style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
// //             >
// //                 Save
// //             </button>
// //             {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
// //             {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
// //             {fetchError && <div style={{ color: 'red', marginTop: '10px' }}>Failed to fetch saved wallet</div>}
// //         </div>
// //     );
// // }

// // export default ClaimPage;
// 'use client'
// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import { useWallet } from '@solana/wallet-adapter-react';
// import useSWR from 'swr';

// const WalletMultiButton = dynamic(
//     () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
//     { ssr: false }
// );

// const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

// const ClaimPage = () => {
// const [ethWallet, setEthWallet] = useState('');
// const [error, setError] = useState('');
// const [success, setSuccess] = useState('');
// const { publicKey, signMessage, connected } = useWallet();

// const { data, error: fetchError, mutate } = useSWR(
// connected ? `/api/getEthWallet?solAddress=${publicKey?.toBase58()}` : null,
// fetcher
// );

// useEffect(() => {
// if (data && data.ethWallet) {
//     setEthWallet(data.ethWallet);
// }
// }, [data]);

// const handleSave = async () => {
// if (!connected) {
//     setError('Please connect your wallet first.');
//     return;
// }

// if (!signMessage) {
//     setError('This wallet does not support message signing.');
//     return;
// }

// const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${ethWallet}, your Solana wallet: ${publicKey.toBase58()}`;
// const encodedMessage = new TextEncoder().encode(message);

// try {
//     const signature = await signMessage(encodedMessage);
//     const response = await fetch('/api/saveWallets', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         sol: publicKey.toBase58(),
//         eth: ethWallet,
//         sig: Buffer.from(signature).toString('base64'),
//     }),
//     });

//     if (response.ok) {
//     setSuccess('Successfully saved');
//     mutate(); // Refresh the data
//     } else {
//     const errorData = await response.json();
//     setError(errorData.message || 'Failed to save. Please try again.');
//     }
// } catch (error) {
//     console.error('Failed to sign message:', error);
//     setError(`Failed to sign the message: ${(error as Error).message}`);
// }
// };

// return (
// <div style={{ margin: '20px' }}>
//     <h1>Claim Tokens</h1>
//     <input
//     type="text"
//     placeholder="Your ETH Wallet to receive tokens"
//     value={ethWallet}
//     onChange={(e) => setEthWallet(e.target.value)}
//     style={{ padding: '10px', margin: '10px 0', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
//     />
//     <div className="wallet-connect" style={{ margin: '10px 0' }}>
//     <WalletMultiButton />
//     </div>
//     {connected && publicKey && (
//     <div style={{ marginTop: '10px', fontSize: '16px' }}>
//         <strong>Your connected wallet:</strong> {publicKey.toBase58().substring(0, 4)}...{publicKey.toBase58().slice(-4)}
//     </div>
//     )}
//     <button
//     onClick={handleSave}
//     style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
//     >
//     Save
//     </button>
//     {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
//     {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
//     {fetchError && <div style={{ color: 'red', marginTop: '10px' }}>Failed to fetch saved wallet</div>}
// </div>
// );
// }

// export default ClaimPage;
'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr';

const WalletMultiButton = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
    { ssr: false }
);

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

const ClaimPage = () => {
    const [ethWallet, setEthWallet] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { publicKey, signMessage, connected } = useWallet();

    const { data, error: fetchError, mutate } = useSWR(
        connected ? `/api/getEthWallet?solAddress=${publicKey?.toBase58()}` : null,
        fetcher
    );

    useEffect(() => {
        if (data && data.ethWallet) {
            setEthWallet(data.ethWallet);
        }
    }, [data]);

    const handleSave = async () => {
        if (!connected) {
            setError('Please connect your wallet first.');
            return;
        }

        if (!signMessage) {
            setError('This wallet does not support message signing.');
            return;
        }

        const message = `Now you certify that you want to receive tokens in the following wallet. Eth wallet: ${ethWallet}, your Solana wallet: ${publicKey.toBase58()}`;
        const encodedMessage = new TextEncoder().encode(message);

        try {
            const signature = await signMessage(encodedMessage);
            const response = await fetch('/api/saveWallets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sol: publicKey.toBase58(),
                    eth: ethWallet,
                    sig: Buffer.from(signature).toString('base64'),
                }),
            });

            if (response.ok) {
                setSuccess('Successfully saved');
                mutate(); // Refresh the data
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to save. Please try again.');
            }
        } catch (error) {
            console.error('Failed to sign message:', error);
            setError(`Failed to sign the message: ${(error as Error).message}`);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box'
        }}>
            <div style={{
                background: 'purple',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                padding: '30px',
                width: '90%',
                maxWidth: '500px',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#eee', marginBottom: '20px' }}>Claim Tokens</h1>
                <input
                    type="text"
                    placeholder="Your ETH Wallet to receive tokens"
                    value={ethWallet}
                    onChange={(e) => setEthWallet(e.target.value)}
                    style={{
                        padding: '10px',
                        margin: '10px 0',
                        width: '100%',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                        color: '#333'
                    }}
                />
                <div className="wallet-connect" style={{ margin: '10px 0' }}>
                    <WalletMultiButton />
                </div>
                {connected && publicKey && (
                    <div style={{ marginTop: '10px', fontSize: '16px', color: '#eee' }}>
                        <strong>Your connected wallet:</strong> {publicKey.toBase58().substring(0, 4)}...{publicKey.toBase58().slice(-4)}
                    </div>
                )}
                <button
                    onClick={handleSave}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '4px',
                        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Save
                </button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
                {fetchError && <div style={{ color: 'red', marginTop: '10px' }}>Failed to fetch saved wallet</div>}
            </div>
        </div>
    );
}

export default ClaimPage;

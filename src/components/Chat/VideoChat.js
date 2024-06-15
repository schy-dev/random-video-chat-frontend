import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoChat = () => {
  const [socket] = useState(() => io(':5000'));
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const startMedia = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream;
      localStreamRef.current = localStream;
    };

    startMedia();

    socket.on('offer', handleReceiveOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleNewICECandidateMsg);

    return () => socket.disconnect();
  }, [socket]);

  const callUser = async () => {
    peerRef.current = createPeer();
    localStreamRef.current.getTracks().forEach(track => peerRef.current.addTrack(track, localStreamRef.current));
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;

    return peer;
  };

  const handleReceiveOffer = async (offer) => {
    peerRef.current = createPeer();
    await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    localStreamRef.current.getTracks().forEach(track => peerRef.current.addTrack(track, localStreamRef.current));
    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);
    socket.emit('answer', answer);
  };

  const handleAnswer = (answer) => {
    peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleICECandidateEvent = (e) => {
    if (e.candidate) {
      socket.emit('ice-candidate', e.candidate);
    }
  };

  const handleNewICECandidateMsg = (incoming) => {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current.addIceCandidate(candidate);
  };

  const handleTrackEvent = (e) => {
    remoteVideoRef.current.srcObject = e.streams[0];
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={callUser}>Start Call</button>
    </div>
  );
};

export default VideoChat;

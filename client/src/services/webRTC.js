export class WebRTC {
    constructor() {
        this.peer = new RTCPeerConnection({
            iceServers: [
                // {
                //     url: 'stun:global.stun.twilio.com:3478',
                //     urls: 'stun:global.stun.twilio.com:3478'
                // },
                // {
                //     url: 'turn:global.turn.twilio.com:3478?transport=udp',
                //     username: 'fc5e88c521d3f88f2e94f3bf9468285b68b32615e621ef44e30d4adc164121b6',
                //     urls: 'turn:global.turn.twilio.com:3478?transport=udp',
                //     credential: 'Sx8RRXs0MfRND4SHfiU6WUBiqktvAoauSQGUboumzdM='
                // },
                // {
                //     url: 'turn:global.turn.twilio.com:3478?transport=tcp',
                //     username: 'fc5e88c521d3f88f2e94f3bf9468285b68b32615e621ef44e30d4adc164121b6',
                //     urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
                //     credential: 'Sx8RRXs0MfRND4SHfiU6WUBiqktvAoauSQGUboumzdM='
                // },
                // {
                //     url: 'turn:global.turn.twilio.com:443?transport=tcp',
                //     username: 'fc5e88c521d3f88f2e94f3bf9468285b68b32615e621ef44e30d4adc164121b6',
                //     urls: 'turn:global.turn.twilio.com:443?transport=tcp',
                //     credential: 'Sx8RRXs0MfRND4SHfiU6WUBiqktvAoauSQGUboumzdM='
                // },
                {
                    url: 'relay1.expressturn.com:3478',
                    username: 'efSR7Z2BZ6S538G8ER',
                    credential: 'ejftGTC1fdOIhaH6'
                }
            ]
        })
    }

    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(offer);
            return offer;
        }
    }

    async getAnswer() {
        if (this.peer) {
            const answer = await this.peer.createAnswer();
            await this.peer.setLocalDescription(answer);
            return answer;
        }
    }
}

export const webRTC = new WebRTC();
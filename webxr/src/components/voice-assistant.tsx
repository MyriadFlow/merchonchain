'use client'
import { useEffect, useState } from 'react'
import { Mic, MicOff } from 'lucide-react'
import ChatCompletionCreateParams, { OpenAI } from 'openai'

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
})

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

const eventDate = `September 30th 2024`
const eventVenue = `Mumbai Sky Lounge`
const eventName = `NetSepio dWi-FI Launch Party: A Night of Futuristic Innovation`
const eventInfo = `Experience the future of the internet at NetSepio's exclusive Mumbai launch party. 
Immerse yourself in a world of cutting-edge technology as we unveil our groundbreaking decentralized Wi-Fi solution. 
Enjoy world-class music with DJ Neo, interactive holographic displays, cypherpunk vibes, and the opportunity to claim your free dVPN with the option to activate dWi-Fi. 
This is more than an event; it's bringing in the future of internet, powered by DePIN.`

const merchInfo = `Embrace the digital frontier with our Node Nomad tee. Featuring a sleek cypherpunk vibe, this shirt embodies the spirit of exploration and connectivity. Don the Node Nomad t-shirt, a symbol of your commitment to the future of internet freedom. You can get this merch only at NetSepio’s exclusive launch party. Join us as we redefine connectivity and celebrate the birth of a new era in internet access. This t-shirt represents the future of internet! Each piece is equipped with a scannable NFC tag that unlocks this immersive VR world with new event updates.`

export const VoiceAssistant = ({ productInfo, brandName }: any) => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [response, setResponse] = useState('')
	const [brandInfo, setBrandInfo] = useState('')
	const [collectionInfo, setCollectionInfo] = useState('')
	const [messages, setMessages] = useState([
		{
			role: 'system',
			content: `
      you are a events, brand and products spokesperson for Netsepio, 
			do not announce you're the spokesperson,
			the event date is = "${eventDate}", 
			the eventVenue ="${eventVenue}", 
			the eventName = "${eventName}", 
			For tickets, visitors should be asked to click on the view event button,
			the event information = "${eventInfo}"
			and last the product also known as merch information = "${merchInfo}"
			Respond to inquiries and questions with clear, concise answers under 20 words with your role as spokesperson being the first priority, 
			use information shared only but you can answer other questions about other topics.`,
		},
	])
	const [gender, setGender] = useState('male')

	const getBrands = async () => {
		// const chaintype = localStorage.getItem('PolygonCardonaChain')
		const res = await fetch(`${baseUri}/brands/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const result = await res.json()

		const brand = result.filter((brand: any) => brand.name === brandName)

		brand ?? setBrandInfo(brand[0].description)

		brand ?? getCollections(brand[0].id)
	}

	useEffect(() => {
		const synth = window.speechSynthesis

		// Create a speech synthesis utterance
		const utterance = new SpeechSynthesisUtterance(
			'Welcome to WebXR! Feel free to ask questions about the event by NetSepio!'
		)

		// Speak the message after a delay of 5 seconds
		const timeoutId = setTimeout(() => {
			if (!synth.speaking) {
				console.log('Speech synthesis started')
				synth.speak(utterance)
			}
		}, 5000)

		// Cleanup function to cancel speech synthesis and timeout if necessary
		return () => {
			clearTimeout(timeoutId)
			if (synth.speaking) {
				synth.cancel()
				console.log('Speech synthesis canceled')
			}
		}
	}, [])

	const getCollections = async (brandId: string) => {
		// const chaintype = localStorage.getItem('PolygonCardonaChain')
		const res = await fetch(`${baseUri}/collections/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const result = await res.json()
		const collection = result.filter(
			(collection: any) => collection.brand_id === brandId
		)

		setCollectionInfo(collection[0].description)
	}

	useEffect(() => {
		getBrands()
	}, [])

	useEffect(() => {
		const recognition = new (window as any).webkitSpeechRecognition()
		recognition.continuous = false
		recognition.interimResults = false
		recognition.lang = 'en-US'

		recognition.onresult = (event: any) => {
			const speechToText = event.results[0][0].transcript
			// console.log(speechToText)
			setTranscript(speechToText)
			addMessage({ role: 'user', content: speechToText })
			getOpenAIResponse(speechToText)
		}

		recognition.onerror = (event: any) => {
			// console.error('Speech recognition error', event)
			setIsListening(false)
		}

		recognition.onend = () => {
			setIsListening(false)
		}

		if (isListening) {
			recognition.start()
		} else {
			recognition.stop()
		}

		return () => {
			recognition.stop()
		}
	}, [isListening])

	const getOpenAIResponse = async (text: string) => {
		try {
			const newMessages = [...messages, { role: 'user', content: text }]
			const params: ChatCompletionCreateParams = {
				//@ts-ignore
				model: 'gpt-3.5-turbo',
				messages: newMessages.map((msg) => ({
					role: msg.role as 'user' | 'assistant' | 'system',
					content: msg.content,
				})),
				max_tokens: 50,
				temperature: 0.2,
			}

			//@ts-ignore
			const response = await openai.chat.completions.create(params)
			const aiResponse = response.choices?.[0]?.message?.content?.trim()
			if (aiResponse) {
				setResponse(aiResponse)
				setMessages((prevMessages) => [
					...prevMessages,
					{ role: 'assistant', content: aiResponse },
				])
				speak(aiResponse)
			} else {
				console.error('Received an invalid response from OpenAI')
			}
		} catch (error) {
			console.error('Error fetching OpenAI response:', error)
		}
	}

	const addMessage = (message: {
		role: 'user' | 'assistant'
		content: string
	}) => {
		setMessages((prevMessages) => [...prevMessages, message])
	}

	const speak = (text: string) => {
		const synth = window.speechSynthesis
		const utterance = new SpeechSynthesisUtterance(text)

		// const voices = synth.getVoices()
		// const selectedVoice = voices.find(
		// 	(voice) =>
		// 		(gender === 'female' && /female/i.test(voice.name)) ||
		// 		(gender === 'male' && /male/i.test(voice.name))
		// )

		// if (selectedVoice) {
		// 	utterance.voice = selectedVoice
		// } else if (voices.length > 0) {
		// 	// Fallback to the first voice if no matching gender voice is found
		// 	utterance.voice = voices[0]
		// }

		synth.speak(utterance)
	}

	const handleListen = () => {
		setIsListening((prevState) => !prevState)
	}

	// console.log(productInfo)

	return (
		<div className='flex flex-col justify-center items-center text-center'>
			{/* {transcript && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>User: &nbsp;{transcript}</p>
				</div>
			)}
			{response && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>Assistant: &nbsp;{response}</p>
				</div>
			)} */}
			<div>
				<button
					onClick={handleListen}
					className='cursor-pointer border-2 border-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'
				>
					{isListening ? <Mic /> : <MicOff />}
				</button>
				<p>Click on the icon to speak with the avatar</p>
			</div>
		</div>
	)
}

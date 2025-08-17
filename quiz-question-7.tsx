"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

const quizOptions: QuizOption[] = [
  { id: "1", text: "Estilo moderno", isCorrect: false },
  { id: "2", text: "Preço baixo", isCorrect: false },
  { id: "3", text: "Conforto e proteção da pele do bebê", isCorrect: true },
  { id: "4", text: "Fraldas com desenhos coloridos", isCorrect: false },
]

export default function QuizQuestion7() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const router = useRouter()
  const errorAudioRef = useRef<HTMLAudioElement>(null)
  const successAudioRef = useRef<HTMLAudioElement>(null)

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    // Pequeno delay para mostrar a seleção antes de mostrar o resultado
    setTimeout(() => {
      setShowResult(true)

      // Se acertou, mostra celebração
      const selectedOptionData = quizOptions.find((option) => option.id === optionId)
      if (selectedOptionData?.isCorrect) {
        // Toca som de sucesso
        if (successAudioRef.current) {
          successAudioRef.current.play().catch(console.error)
        }
        setShowCelebration(true)
        // Após 2 segundos, vai para a tela de resultado final
        setTimeout(() => {
          router.push("/quiz/result")
        }, 2000)
      } else {
        // Se errou, toca o som de erro
        if (errorAudioRef.current) {
          errorAudioRef.current.play().catch(console.error)
        }
        // Após 2 segundos, reseta para tentar novamente
        setTimeout(() => {
          setSelectedOption(null)
          setShowResult(false)
        }, 2000)
      }
    }, 500)
  }

  const selectedOptionData = quizOptions.find((option) => option.id === selectedOption)
  const isCorrectAnswer = selectedOptionData?.isCorrect || false

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Audio elements */}
      <audio ref={errorAudioRef} preload="auto">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SOM%20NEGADO%20OK-UTCE7VkKJOha7x5vtMo6JN0HKjld6J.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={successAudioRef} preload="auto">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SOM%20CERTO-6K7r361hgjfC5zX6hDP9qrmbJA0GtA.mp3" type="audio/mpeg" />
      </audio>

      {/* Header Bar - Mantém o mesmo cabeçalho */}
      <div className="w-full bg-[#00a9a4] py-2 px-4 flex justify-center items-center">
        <div className="w-20 h-10 relative">
          <Image src="/images/pampers-logo.svg" alt="Pampers Logo" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-40 h-40 relative">
            <Image
              src="/images/success-celebration.gif"
              alt="Parabéns!"
              layout="fill"
              objectFit="contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Quiz Container */}
          <div className="bg-[#bae3e3] rounded-3xl p-6 shadow-lg border-2 border-[#00E0FF]">
            {/* Question */}
            <div className="mb-6">
              <h2 className="text-[#008080] text-lg font-semibold mb-4">
                7. O que a Pampers mais valoriza em seus produtos para bebês?
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {quizOptions.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => !showResult && handleOptionSelect(option.id)}
                  disabled={showResult}
                  className={`
                    w-full p-4 text-left rounded-xl text-white font-medium transition-all duration-300 min-h-[60px] flex items-center
                    ${
                      selectedOption === option.id
                        ? showResult
                          ? option.isCorrect
                            ? "bg-green-500 hover:bg-green-500"
                            : "bg-red-500 hover:bg-red-500"
                          : "bg-[#00a9a4] hover:bg-[#00a9a4] ring-2 ring-white"
                        : "bg-[#00a9a4] hover:bg-[#008a86]"
                    }
                    ${showResult ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}
                  `}
                >
                  <span className="text-sm leading-relaxed whitespace-normal break-words flex-1 pr-2">
                    {option.text}
                  </span>
                  {showResult && selectedOption === option.id && option.isCorrect && (
                    <span className="ml-2 flex-shrink-0">✓</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-2 bg-[#00a9a4] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-auto pt-8 text-center px-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            © Pampers Online. Todos os direitos reservados.
          </p>
          <p className="text-xs">
            <a href="#" className="text-orange-500 hover:text-orange-600 underline">
              Termos e condições
            </a>
            {" | "}
            <a href="#" className="text-orange-500 hover:text-orange-600 underline">
              Política de privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

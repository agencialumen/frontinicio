"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function QuizResult() {
  const router = useRouter()

  const handleClaimDiscount = () => {
    // Redireciona para a página de resgate do desconto
    window.open("https://pamperspag.netlify.app", "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header Bar - Mantém o mesmo cabeçalho */}
      <div className="w-full bg-[#00a9a4] py-2 px-4 flex justify-center items-center">
        <div className="w-20 h-10 relative">
          <Image src="/images/pampers-logo.svg" alt="Pampers Logo" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Result Container */}
          <div className="bg-[#ccd0dc] rounded-3xl overflow-hidden shadow-lg border-2 border-[#00E0FF]">
            {/* Result Image */}
            <div className="relative w-full h-[500px]">
              <Image
                src="/images/quiz-result.png"
                alt="Parabéns! Você ganhou 09 pacotes de fraldas + 06 lenços umedecidos"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>

            {/* Button Container */}
            <div className="p-6 bg-[#ccd0dc]">
              {/* Congratulations Text */}
              <div className="text-center mb-6">
                <p className="text-[#008080] text-lg font-bold mb-2">
                  Parabéns! Você ganhou 9 pacotes de fraldas + 6 lenços umedecidos.
                </p>
                <p className="text-[#008080] text-sm mb-2">
                  Sua pontuação no quiz da Pampers foi suficiente para desbloquear essa recompensa especial.
                </p>
                <p className="text-[#FF005C] text-xl font-bold">98% de desconto</p>
              </div>

              <Button
                onClick={handleClaimDiscount}
                className="w-full rounded-full py-4 text-lg font-bold text-white bg-gradient-button shadow-lg hover:opacity-90 transition-opacity animate-pulse-scale"
                style={{
                  boxShadow: "0 4px 15px rgba(255, 0, 92, 0.4), 0 4px 15px rgba(255, 138, 0, 0.4)",
                }}
              >
                RESGATAR DESCONTO
              </Button>
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

      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

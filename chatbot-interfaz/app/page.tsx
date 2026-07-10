import AltChatView from '@/components/chatbot/AltChatView'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'

export default function Home() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(8, 0, 10)"
      gradientBackgroundEnd="rgb(8, 0, 10)"
      firstColor="255, 0, 110"
      secondColor="255, 107, 0"
      thirdColor="255, 215, 0"
      fourthColor="255, 0, 110"
      fifthColor="255, 107, 0"
      pointerColor="255, 215, 0"
      size="90%"
      blendingValue="hard-light"
      interactive={true}
    >
      <AltChatView />
    </BackgroundGradientAnimation>
  )
}

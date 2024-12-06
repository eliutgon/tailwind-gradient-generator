import { useState, useEffect } from 'react'
import { ColorSelector } from '@/components/color-selector'
import { GradientPreview } from '@/components/gradient-preview'
import { Github, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

const tailwindColors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
]
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const positions = ['0%', '25%', '50%', '75%', '100%']
const directions = ['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl']

const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)]

export default function App() {
    const { toast } = useToast()
    const { theme, setTheme } = useTheme()
    const [startColor, setStartColor] = useState('green')
    const [startShade, setStartShade] = useState('400')
    const [startPosition, setStartPosition] = useState('0%')

    const [middleColor, setMiddleColor] = useState('cyan')
    const [middleShade, setMiddleShade] = useState('900')
    const [middlePosition, setMiddlePosition] = useState('50%')

    const [endColor, setEndColor] = useState('blue')
    const [endShade, setEndShade] = useState('500')
    const [endPosition, setEndPosition] = useState('100%')

    const [direction, setDirection] = useState('to-r')
    const [warningMessage, setWarningMessage] = useState<string | undefined>(undefined)

    const gradientClass = `bg-gradient-${direction} from-${startColor}-${startShade} from-${startPosition} via-${middleColor}-${middleShade} via-${middlePosition} to-${endColor}-${endShade} to-${endPosition}`

    const onRandomGradient = () => {
        setStartColor(getRandomItem(tailwindColors))
        setStartShade(getRandomItem(shades))
        setStartPosition(getRandomItem(positions))

        setMiddleColor(getRandomItem(tailwindColors))
        setMiddleShade(getRandomItem(shades))
        setMiddlePosition(getRandomItem(positions))

        setEndColor(getRandomItem(tailwindColors))
        setEndShade(getRandomItem(shades))
        setEndPosition(getRandomItem(positions))

        setDirection(getRandomItem(directions))
    }

    const onShare = () => {
        navigator.clipboard.writeText(gradientClass).then(() => {
            toast({
                title: 'Gradient class copied!',
                description: 'The gradient class has been copied to your clipboard.',
            })
        })
    }

    const onSave = () => {
        // Implement save functionality (e.g., to local storage)
        toast({
            title: 'Gradient saved!',
            description: 'The gradient has been saved to your collection.',
        })
    }

    const onExport = () => {
        // Implement export functionality (e.g., as CSS or image)
        toast({
            title: 'Gradient exported!',
            description: 'The gradient has been exported as CSS.',
        })
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="border-b">
                <div className="container mx-auto max-w-screen-xl flex h-14 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-6 h-6 rounded" />
                        <span className="font-semibold">Tailwind Gradient Generator</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            Feedback
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Github className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        >
                            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto max-w-screen-xl py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <ColorSelector
                            label="Starting color (from)"
                            selectedColor={startColor}
                            onColorSelect={setStartColor}
                            shade={startShade}
                            onShadeSelect={setStartShade}
                            stopPosition={startPosition}
                            onStopPositionSelect={setStartPosition}
                        />
                        <ColorSelector
                            label="Middle color (via)"
                            selectedColor={middleColor}
                            onColorSelect={setMiddleColor}
                            shade={middleShade}
                            onShadeSelect={setMiddleShade}
                            stopPosition={middlePosition}
                            onStopPositionSelect={setMiddlePosition}
                        />
                        <ColorSelector
                            label="Ending color (to)"
                            selectedColor={endColor}
                            onColorSelect={setEndColor}
                            shade={endShade}
                            onShadeSelect={setEndShade}
                            stopPosition={endPosition}
                            onStopPositionSelect={setEndPosition}
                        />
                    </div>
                    <div>
                        <GradientPreview
                            gradientClass={gradientClass}
                            onDirectionChange={setDirection}
                            onRandomGradient={onRandomGradient}
                            onShare={onShare}
                            onSave={onSave}
                            onExport={onExport}
                            warningMessage={warningMessage}
                        />
                    </div>
                </div>
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container mx-auto max-w-screen-xl flex h-14 items-center justify-between">
                    <div className="text-sm text-muted-foreground">Copyright © 2024 Tailwind Gradient Generator</div>
                    <div className="text-sm text-muted-foreground">Made with ❤️ by Roberth González</div>
                </div>
            </footer>

            <Toaster />
        </div>
    )
}
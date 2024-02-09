"use client"
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useInterval from '@use-it/interval'
import {Button} from "../../components/ui/button"
import {Card, CardContent, CardTitle} from "../../components/ui/card"
import {Avatar, AvatarImage, AvatarFallback} from "../../components/ui/avatar"
import ConfettiExplosion from 'react-confetti-explosion';
import { api } from '../../convex/_generated/api';
import {useMutation,useQuery} from "convex/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from "../../components/ui/table"
import { ImageIcon, Space } from 'lucide-react'
import Image from 'next/image'

type Apple = {
  x: number
  y: number
}

type Velocity = {
  dx: number
  dy: number
}



export default function SnakeGame() {

  // Canvas Settings
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasWidth = 500
  const canvasHeight = 380
  const canvasGridSize = 20

  // Game Settings
  const minGameSpeed = 10
  const maxGameSpeed = 15

  // Game State
  const [gameDelay, setGameDelay] = useState<number>(1000 / minGameSpeed)
  const [countDown, setCountDown] = useState<number>(4)
  const [running, setRunning] = useState(false)
  const [isLost, setIsLost] = useState(false)
  const [highscore, setHighscore] = useState(0)
  const [newHighscore, setNewHighscore] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState<{
    head: { x: number; y: number }
    trail: Array<any>
  }>({
    head: { x: 12, y: 9 },
    trail: [],
  })
  const [apple, setApple] = useState<Apple>({ x: -1, y: -1 })
  const [velocity, setVelocity] = useState<Velocity>({ dx: 0, dy: 0 })
  const [previousVelocity, setPreviousVelocity] = useState<Velocity>({
    dx: 0,
    dy: 0,
  })
    //convex function calls
    const addHighScore = useMutation(api.myFunctions.addHighScore)
    const getHighScore = useQuery(api.myFunctions.getHighScores) 

  const clearCanvas = (ctx: CanvasRenderingContext2D) =>
    ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2)

  const generateApplePosition = (): Apple => {
    const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize))
    const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize))
    // Check if random position interferes with snake head or trail
    if (
      (snake.head.x === x && snake.head.y === y) ||
      snake.trail.some((snakePart) => snakePart.x === x && snakePart.y === y)
    ) {
      return generateApplePosition()
    }
    return { x, y }
  }

  // Initialise state and start countdown
  const startGame = () => {
    setGameDelay(1000 / minGameSpeed)
    setIsLost(false)
    setScore(0)
    setSnake({
      head: { x: 12, y: 9 },
      trail: [],
    })
    setApple(generateApplePosition())
    setVelocity({ dx: 0, dy: -1 })
    setRunning(true)
    setNewHighscore(false)
    setCountDown(3)
  }

  // Reset state and check for highscore
  const gameOver = () => {
    if (score > highscore) {
      addHighScore({highscore: score})
      localStorage.setItem('highscore', score.toString())
      setNewHighscore(true)
    }
    setIsLost(true)
    setRunning(false)
    setVelocity({ dx: 0, dy: 0 })
    setCountDown(4)
  }

  const fillRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.fillRect(x, y, w, h)
  }

  const strokeRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.strokeRect(x + 0.5, y + 0.5, w, h)
  }

  const drawSnake = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#0170F3'
    ctx.strokeStyle = '#003779'

    fillRect(
      ctx,
      snake.head.x * canvasGridSize,
      snake.head.y * canvasGridSize,
      canvasGridSize,
      canvasGridSize
    )

    strokeRect(
      ctx,
      snake.head.x * canvasGridSize,
      snake.head.y * canvasGridSize,
      canvasGridSize,
      canvasGridSize
    )

    snake.trail.forEach((snakePart) => {
      fillRect(
        ctx,
        snakePart.x * canvasGridSize,
        snakePart.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      )

      strokeRect(
        ctx,
        snakePart.x * canvasGridSize,
        snakePart.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      )
    })
  }

  const drawApple = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#DC3030' // '#38C172' // '#F4CA64'
    ctx.strokeStyle = '#881A1B' // '#187741' // '#8C6D1F

    if (
      apple &&
      typeof apple.x !== 'undefined' &&
      typeof apple.y !== 'undefined'
    ) {
      fillRect(
        ctx,
        apple.x * canvasGridSize,
        apple.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      )

      strokeRect(
        ctx,
        apple.x * canvasGridSize,
        apple.y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      )
    }
  }

  // Update snake.head, snake.trail and apple positions. Check for collisions.
  const updateSnake = () => {
    // Check for collision with walls
    const nextHeadPosition = {
      x: snake.head.x + velocity.dx,
      y: snake.head.y + velocity.dy,
    }
    if (
      nextHeadPosition.x < 0 ||
      nextHeadPosition.y < 0 ||
      nextHeadPosition.x >= canvasWidth / canvasGridSize ||
      nextHeadPosition.y >= canvasHeight / canvasGridSize
    ) {
      gameOver()
    }

    // Check for collision with apple
    if (nextHeadPosition.x === apple.x && nextHeadPosition.y === apple.y) {
      setScore((prevScore) => prevScore + 1)
      setApple(generateApplePosition())
    }

    const updatedSnakeTrail = [...snake.trail, { ...snake.head }]
    // Remove trail history beyond snake trail length (score + 2)
    while (updatedSnakeTrail.length > score + 2) updatedSnakeTrail.shift()
    // Check for snake colliding with itsself
    if (
      updatedSnakeTrail.some(
        (snakePart) =>
          snakePart.x === nextHeadPosition.x &&
          snakePart.y === nextHeadPosition.y
      )
    )
      gameOver()

    // Update state
    setPreviousVelocity({ ...velocity })
    setSnake({
      head: { ...nextHeadPosition },
      trail: [...updatedSnakeTrail],
    })
  }

  // Game Hook
  useEffect(() => {
    const canvas = canvasRef?.current
    const ctx = canvas?.getContext('2d')

    if (ctx && !isLost) {
      clearCanvas(ctx)
      drawApple(ctx)
      drawSnake(ctx)
    }
  }, [snake])

  // Game Update Interval
  useInterval(
    () => {
      if (!isLost) {
        updateSnake()
      }
    },
    running && countDown === 0 ? gameDelay : null
  )

  // Countdown Interval
  useInterval(
    () => {
      setCountDown((prevCountDown) => prevCountDown - 1)
    },
    countDown > 0 && countDown < 4 ? 800 : null
  )

  // DidMount Hook for Highscore
  useEffect(() => {
    setHighscore(
        localStorage.getItem('highscore')
        ?  parseInt(localStorage.getItem('highscore')!)
        : 0
    )
  }, [])

  // Score Hook: increase game speed starting at 16
  useEffect(() => {
    if (score > minGameSpeed && score <= maxGameSpeed) {
      setGameDelay(1000 / score)
    }
  }, [score])

  // Event Listener: Key Presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'w',
          'a',
          's',
          'd',
          'p',
        ].includes(e.key)
      ) {
        let velocity = { dx: 0, dy: 0 }

        switch (e.key) {
          case 'ArrowRight':
            velocity = { dx: 1, dy: 0 }
            break
          case 'ArrowLeft':
            velocity = { dx: -1, dy: 0 }
            break
          case 'ArrowDown':
            velocity = { dx: 0, dy: 1 }
            break
          case 'ArrowUp':
            velocity = { dx: 0, dy: -1 }
            break
          case 'd':
            velocity = { dx: 1, dy: 0 }
            break
          case 'a':
            velocity = { dx: -1, dy: 0 }
            break
          case 's':
            velocity = { dx: 0, dy: 1 }
            break
          case 'w':
            velocity = { dx: 0, dy: -1 }
            break
          case 'p':
              velocity = { dx: 0, dy: 0 }
            break

          default:
            console.error('Error with handleKeyDown')
        }
        if (
          !(
            previousVelocity.dx + velocity.dx === 0 &&
            previousVelocity.dy + velocity.dy === 0
          )
        ) {
          setVelocity(velocity)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [previousVelocity])


  return (
    <>
      <div className='flex items-center justify-center text-4xl text-green-500'>Snake</div>
      <main className='flex relative items-center justify-center'>
      <Card className=' p-2 '>
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-lg">
       
        <canvas className='flex h-full w-full items-center justify-center bg-gray-800 back rounded-lg '
          ref={canvasRef}
          width={canvasWidth + 1}
          height={canvasHeight + 1}
        />
       
         </div>
          <div className="p-2">
            <p>
              <FontAwesomeIcon icon={['fas', 'star']} />
              Score: {score}
            </p>
            <p>
 
            {/*Highscore: {highscore > score ? highscore : score*/}
              <div className="flex items-center justify-center">
              <div className='text-lg bg-gradient-to-r p-1 b-1 from-pink-500 via-red-500 to-yellow-500 rounded w-1/3'><div className='bg-slate-500 rounded flex items-center justify-center'>Leader Board </div></div>

              </div>
              <div className='p-2 '>
              <Table className='w-full border-2 '>
              {getHighScore
                    ?.sort((a, b) => b.highscore - a.highscore) // Sort the data by highscore in descending order
                    .slice(0, 5) // Take the top 10 scores
                    .map((hs,index) => (
                      <div key={hs._id} className='gap-2'>
                        <TableRow>
                        <TableCell >
                          {index === 0 && ( // Check if current score is the highest
                              <FontAwesomeIcon icon={['fas', 'trophy']} style={{ color: 'gold' }} />
                              )}
                          {index === 1 && (
                            <FontAwesomeIcon icon={['fas', 'trophy']} style={{ color: '#c0c0c0' }} />
                            )}
                          {index === 2 && (
                            <FontAwesomeIcon icon={['fas', 'trophy']} style={{ color: '#cd7f32' }} />)}
                            
                            <Avatar className='w-5 h-30'>
                              <AvatarImage src={hs.pictureId} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </TableCell>
                            <TableCell className='w-full'>
                            {hs.name}
                            </TableCell>
                          
                          <TableCell >
                            {hs.highscore}
                          </TableCell>
                        </TableRow>
                      </div>
                     
                  ))} </Table>
                  </div>
                 
            </p>
          </div>

          {!isLost && countDown > 0 ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='rounded-lg p-10 backdrop-blur-md mt-24'>
            <Button onClick={startGame} variant="snake">
              {countDown === 4 ? 'Start Game' : countDown}
            </Button>
              </div>
            </div>
          ) : (
            <div className="p-2">
              <p>How to Play?</p>
              <p>
                <FontAwesomeIcon icon={['fas', 'arrow-up']} />
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                <FontAwesomeIcon icon={['fas', 'arrow-down']} />
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
              </p>
            </div>
          )}
          </Card>
          {isLost && (
            <div className="flex absolute inset-1 items-center justify-center">
            <div className="p-10 flex items-center justify-center backdrop-blur-md
        rounded-lg flex-col items-center justify-center border-2 border-gray-200 border-opacity-5"> 

          <div className="text-4xl">Game Over</div>
            <div className="text-xl">

              {newHighscore ?  ( <> 🎉 New Highscore 🎉
                 <ConfettiExplosion force={0.5} zIndex={1} duration={3500} particleSize={5} height="120vh" colors={[
                  '#FFC700','#FF0000','#2E3191','#41BBC7','#fc59a3','#87c830','#ffd400','#fe7e0f','#8e3ccb']} particleCount={450} />
              </>): `You scored: ${score}`}
            </div>

            {!running && isLost && (
             <Button onClick={startGame} className="mt-2" variant="snake">
             {countDown === 4 ? 'Restart Game' : countDown}
           </Button>
            )}
            </div>
            </div>
        )}
            
         </main>
 
     
      <footer>
        Copyright &copy; <a href="https://mueller.dev">Marc Müller</a> 2022
        &nbsp;|&nbsp;{' '}
        <a href="https://github.com/marcmll/next-snake">
          <FontAwesomeIcon icon={['fab', 'github']} /> Github
        </a>
      </footer>
    </>
  )
}

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
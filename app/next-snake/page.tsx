"use client"
//import './styles/snake.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {  faStar,  faArrowUp,  faArrowRight,  faArrowDown,  faArrowLeft,  faTrophy} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(  faStar,  faArrowUp,  faArrowRight,  faArrowDown,  faArrowLeft,  faTrophy,  faGithub)
config.autoAddCss = false
import HeaderMe from '../../components/layout/header';
import SnakeGame from './snake'

export default function snake (){
  return (
    <>
     <HeaderMe />
      <Unauthenticated>Sign in </Unauthenticated>
      <Authenticated>
        
        <SnakeGame />
        
      </Authenticated>
  </>
  );
}


/** @jsxRuntime classic */
/** @jsx jsx */
import { css,jsx } from '@emotion/core';
import Head from 'next/head'
import ToDoList from '../components/todolist'
import { P100 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

const containerStyles = css({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: token(
    'color.background.discovery',
    P100
  ),
});

const Home = () => {
  return (
    <div css={ containerStyles }>
      <Head>
        <title>To do list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToDoList/>
    </div>
  )
}


export default Home;
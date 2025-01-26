import { EventEmitter } from 'events';
import path from 'path';
import { fork } from 'child_process';
import { Router } from "express";
import { getUserTeamData, getUserTeamInfo } from './teams.services';

const teamsRouter = Router();
const teamCreationEvent = new EventEmitter();

export const createTeamTask = (userId: number) => {
    const child = fork(path.resolve('dist', 'tasks', 'create-team.js'));
    child.send({ userId });

    child.on('message', (result) => {
        teamCreationEvent.emit('complete', { userId })
    });

    child.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Child process exited with code ${code}`);
        }
    });
}

teamsRouter.get('/team-status/:user_id', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const requestId = Number(req.params.user_id);
        const userTeam = await getUserTeamInfo(requestId);
        if(userTeam){
            res.write(`data: ${JSON.stringify({ type: 'complete', message: 'User already has a team' })}\n\n`);
            res.end();
            return;
        }

        // Close connection if the 'complete' handler never gets called in 60 seconds
        const requestTimeout = setTimeout(() => {
            res.write(`data: ${JSON.stringify({ type: 'timeout', message: 'Timeout' })}\n\n`);
            res.end();
            teamCreationEvent.off('complete', handler);
        }, 60_000);

        const handler = ({ userId }: { userId: number }) => {
            if(requestId === userId) {
                res.write(`data: ${JSON.stringify({ type: 'complete', message: 'operation finished successfully' })}\n\n`);
                res.end();
                if(requestTimeout) {
                    clearTimeout(requestTimeout)
                }
            }
        }

        teamCreationEvent.once('complete', handler)

        req.on('close', () => {
            if(requestTimeout) {
                clearTimeout(requestTimeout)
            }
            teamCreationEvent.off('complete', handler);
        })
    } catch (error) {
        res.write(`data: ${JSON.stringify({ type: 'error', error: "Server error" })}\n\n`);
        res.end();
        return;
    }
});

teamsRouter.get('/:user_id', async (req, res, next) => {
    try {
        const teamData = await getUserTeamData(Number(req.params.user_id));
        res.status(200).json(teamData);
    } catch (error) {
        next(error);
    }
})

export default teamsRouter;
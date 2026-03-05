import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";

const SERVER_URL = process.env.SERVER_URL;

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,

        });

        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,

            },
        })

        return res.status(201).json({ success: true, data: subscription, workflowRunId,});

    }
    catch(e){
        next(e);
    }
}

export const getUserSubscription = async (req, res, next) => {
    try{
        //check if the user is the same as the one in the token
        if(req.user.id != req.params.id){
            const error = new Error('You are not authorized');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions});

    } catch(e){
        next(e);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try{
        const { id } = req.params;

        const subscription = await Subscription.findById(id);

        if(!subscription){
            return res.status(404).json({
                success: false,
                message: "Subscription not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: subscription,
        });
    }
    catch(e){
        next(e);
    }
}
export const getAllSubscriptions = async (req, res, next) => {//agamya
    try{
        const subscriptions = await Subscription.find({
            user: req.user._id,
        });

        return res.status(200).json({
            success: true,
            data: subscriptions,
        });
    }
    catch(e){
        next(e);
    }
}
+++
title = "A Follow-up"
[taxonomies]
tags = ["ai"]
[extra]
display_published = true
toc = false
+++

In my last post, I talked about how AI agents are not that good at coding, and how we should take a break from using AI to code. I want to follow up on that post and share some of my thoughts and experiences since then.

## I was right, but also wrong

I have loosened up a bit on my stance on AI coding since then. Yes, I still think that AI agents have the ability to produce slop at scale, and that they can be quite bad at coding if not given very specific and detailed requirements. However, they also seemed to have improved a lot in the past few weeks, and I have seen some impressive results from them. 

For example, [Calif's MAD bugs](https://blog.calif.io/p/mad-bugs-month-of-ai-discovered-bugs) is one of the most impressive examples of "letting AI do whatever it wants" that I have seen. 10 bugs, one with a CVSS score of 8.8, and all of them were found by top AI models, be it GPT-5.5 or Claude Opus, with the right tools and a clear goal. 

I wanted to try letting an agent loose on a real-world target myself. My plan, if I ever find the time, is to use AI agents for reverse engineering and jailbreaking a TV box. It's customized Linux running Weston with vendor's applications on top. I already have the UART, but (un)fortunately, they disabled `getty`, so I can't get a shell. I will need ISP (In-system programming) to flash and dump the firmware, and then I can use AI agents to analyze the firmware and insert some backdoors. It's a fun project, and I will share my results if I ever get to it.

## AI agents are not a silver bullet

[Building pi in a World of Slop](https://www.youtube.com/watch?v=RjfbvDXpFls) is probably the best talk I have seen on this topic. They have created an agent, in the world of agents, that said: "We need to care more about the quality, not the features.". That's why they modularized their agent, to 4 separate packages: the API, the loop, the TUI and the CLI. They opened the system prompt, they removed the MCP, and because of that, they have a much smaller token budget, so that the users can have more control over the agent's behavior.

Now what happens if just like every vibe coded app out there, they just add more and more features to the agent, and make it more and more complex? It will become another black box that we can't understand or control. It will fail quickly, and we will be back to square one. (Still, if you need features, you can always either ask them to write one, or grab one from npm, and add it to the agent yourself. That's the beauty of modularity.)

One more part that I want to talk about is the "human" that is also mentioned in the video. Yes, you, we, the users, the developers, the testers, the managers, the stakeholders. We need to remember that we can learn. We don't need a huge `AGENTS.md` to understand how to work with the codebase. And, unlike agents, we can feel pain, we can learn from our mistakes, and we can adapt to new situations quickly. All that needs no Markdown files, just a bit of common sense and empathy. How many times you have to tell agents to read `AGENTS.md` when they got something wrong, only for them to start reading your `.env` and reset your production database? (I have seen that happen more than once, and it's always because someone decided to give the agent too much power without proper safeguards. Principle of least privilege, anyone?)

## Conclusion

In conclusion, just use AI responsibly. Don't give it too much power, don't rely on it too much, and don't forget that it's just a tool, not a magic wand. It can help you with some tasks, but it can't replace your judgment, your creativity, or your common sense. Use it as a helper, not as a master. And always remember to test your code, whether it's written by you or by an AI agent.
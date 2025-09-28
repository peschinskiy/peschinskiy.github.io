---
title: "Using Maps in AI Assistants: How Do ChatGPT, Gemini and Others Handle Maps-Related Queries?"
date: 2025-09-28 21:12:00 +0200
categories:
  - AI
  - Maps
tags:
  - assistants
  - maps
  - spatial
excerpt: "Researching how popular AI assistants integrate mapping services and how to use AI to find places, build routes, plan trips and more."
---

There is a clear trend towards integrating mapping services into AI assistants. While [userbases are growing](https://www.cnbc.com/2025/08/04/openai-chatgpt-700-million-users.html){:target="_blank" rel="noopener"} and scope of tasks requested from assistants is becoming more and more complex, maps-related features like places search and routing are becoming a potential competitive advantage. That is why model vendors invest in map services and integrate them into their products. While companies providing their own map services, like Microsoft and Google, have a natural advantage, the importance of maps-related features in AI assistants is driving all market leaders in this direction. In this article, we will discuss how popular AI assistants handle maps-related tasks and what are the differences in their approaches.

<!--more-->

## Why Do AI Assistants Need Maps?

Digital maps and services are everyday necessities nowadays - from direct usage of maps to navigate from A to B to discovery queries such as where to go for dinner today. Map services  also provide an extensive toolkit essential for other applications: food delivery, weather apps, taxi orders and many others. But now people frequently prefer to ask ChatGPT for complex problems like planning trips rather than juggling between Web Search, TripAdvisor and Maps, because it's much more convenient to have all information available in one place and processed by an AI assistant, giving you a friendly, clear and structured answer in your language.

However, while LLMs excel at processing text and information, they fundamentally lack [spatial reasoning](https://arxiv.org/abs/2310.03249){:target="_blank" rel="noopener"} that humans take for granted - concepts like proximity, direction, or the relationship between locations remain abstract to them. This occurs because LLMs lack comprehensive geographic data in their memory - they might know the address of a famous museum but not its current opening hours, or they might suggest restaurants without understanding that three "nearby" options are actually in completely opposite directions from each other.

That's why AI assistants need integration with existing map services that can provide precise, complete and current information on geo-related queries. This integration adds an ability to solve a whole new class of real-world tasks that were previously hard to perform with LLMs.

## Expected Features

So, what do regular users expect from AI assistants when they ask about maps-related tasks? Users expect the same features that specialized map services provide, but wrapped into a chat interface. Here are the top abilities that are provided by specialized map services and required for curated, spatial-aware AI answers:

1. **An ability to render maps with marks and routes on it.** Basic rendering is required to be able to show the user where the places are on the map. While text lists and descriptions are useful, they are not enough to understand the relative location of the places.
2. **Spatial reasoning: an ability to calculate routes and travel time between places.** Routing is not only required to be able to show the user the best way to get from one place to another, but also for AI assistant to understand the mutual location of places and travel time between them.
3. **Access to up-to-date information about places, such as reviews, phone numbers, opening hours and other details.** Most assistants can call a web search tool to get this information, but map services are able to provide this information more accurately and in a more structured way.

We will test how popular AI assistants handle these features, what are the differences in their approaches and which integrations do they provide.

## Test Setup

It is not easy to get consistent results when working with AI assistants, especially when trying to compare them with each other. Therefore, we need to define some guardrails and criteria for the test, including:

1. Testing 5 popular AI assistants: Gemini, Copilot, ChatGPT, Perplexity and Claude.
2. Testing only Android/iOS versions, as mobile apps are more likely to have native platform maps integration.
3. Using thinking/reasoning mode where possible to get access to thinking logs and see how the assistant is reasoning about the task.
4. As AI assistants are constantly evolving, the results of this analysis are strictly limited to the time of writing (September 2025).

I mainly used 2 prompts for testing:
1. "Find top 5 Asian restaurants in Berlin and show them on the map." - to test map rendering and places search.
2. "How to reach from 44.80, 20.46 to 44.78, 20.48 and visit the pharmacy between?" - to test routing and spatial reasoning capabilities. I used random coordinates in Belgrade, Serbia as a start and end points.

## Analysis of Popular AI Assistants

Before a deep dive, here is a summary of the results I got:

| Assistant   | Maps Rendering                                             | Spatial Reasoning | Places Search                        |
|-------------|-----------------------------------------------------------|-------------------|----------------------------------------|
| Gemini      | Interactive Google Maps In Responses | Yes               | Web Search + Google Maps Places API    |
| Copilot     | TomTom Maps And Google Maps For Native                     | Yes               | Web Search + Google Maps Reviews       |
| ChatGPT     | No, Possible MapBox Integration              | No                | Web Search                             |
| Perplexity  | Limited, MapBox                                                    | Minimal        | Web Search + TripAdvisor + Selfbook    |
| Claude      | Native Maps On Mobile                                     | Limited        | Web Search                             |

### Google Gemini

Google Gemini is a clear leader here, having a [native integration with various Google Maps APIs](https://blog.google/products/maps/gemini-google-maps-navigation-updates/){:target="_blank" rel="noopener"} and providing a seamless experience for users. Gemini can render an interactive map directly in chat, do routing via Directions API and provide consistent answers for repeating and complex questions. Google is also going further, integrating maps APIs into [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-maps){:target="_blank" rel="noopener"} and allowing developers to use [Gemini models to generate maps-related content](https://developers.google.com/maps/documentation/places/web-service/experimental/places-generative){:target="_blank" rel="noopener"}.

I also noticed interesting lines in Gemini's thinking logs when performing category search queries:

```
I've decided to prioritize using Google Search initially, following the guidance within the Maps tool documentation. ... The Google Search results will give a broad overview, which I'll filter. I'm moving toward using Maps for specific restaurant locations.
```

Seems like, besides having access to the huge Google Maps Places database, Gemini is explicitly told by developers to use Google Search initially and then use Maps for retrieving specific details like locations, reviews, opening hours, etc.

Google's ecosystem includes, besides Maps, services like Hotel, Documents, Calendar and many more, which is also integrated in Gemini. This makes Google's AI assistant a comprehensive tool for multimodal, complex and context-aware tasks.

{% include image-carousel.html id="gemini-carousel" img1="/assets/images/posts/2025-09-28-maps-ai/gemini_search.jpg" alt1="Gemini Maps Search Interface" img2="/assets/images/posts/2025-09-28-maps-ai/gemini_routes.jpg" alt2="Gemini Maps Routing Feature" img3="/assets/images/posts/2025-09-28-maps-ai/gemini_reason.jpg" alt3="Gemini Spatial Reasoning" %}

### Microsoft Copilot

Microsoft, owning Bing Maps, is an active player in the map services market. It seems like for its AI assistant Copilot, it's using another technology - Azure Maps backed by [TomTom](https://news.microsoft.com/source/2019/02/04/tomtom-expands-partnership-with-microsoft-to-power-microsoft-cloud-offerings-with-location-based-services/){:target="_blank" rel="noopener"}. Also, it has an [integration with Google Maps Reviews](https://www.seroundtable.com/copilot-using-google-maps-reviews-39947.html){:target="_blank" rel="noopener"} for places search, enhancing its own results with much more comprehensive Google data. While using TomTom Maps for intermediate results and places search, Copilot provided me with a link to Google Maps application for routing. Overall, Microsoft's assistant successfully attempts to provide a seamless experience for users, but it's not as smooth as Google's Gemini.

{% include image-carousel.html id="copilot-carousel" img1="/assets/images/posts/2025-09-28-maps-ai/copilot_search.jpg" alt1="Copilot Maps Search Interface" img2="/assets/images/posts/2025-09-28-maps-ai/copilot_routes.jpg" alt2="Copilot Maps Routing Feature" %}

### OpenAI ChatGPT

OpenAI, being the most popular AI assistant, surprisingly, does not have any native maps integration. When directly asked to show a map, it's providing a broken web-link to Google Maps application. It also failed a spatial reasoning test, suggesting to visit a pharmacy 5 kilometers away from the route points. It also does not have any specific places search capabilities, suggesting to use web search instead.

MapBox integration in ChatGPT was [officially confirmed](https://www.mapbox.com/blog/mapbox-2024-year-in-review){:target="_blank" rel="noopener"} in 2024, and I personally saw it in August 2025, but right now it is not working for me, so it is not clear whether this integration was removed or restricted in my area.

{% include image-carousel.html id="chatgpt-carousel" img1="/assets/images/posts/2025-09-28-maps-ai/chatgpt.jpg" alt1="ChatGPT Maps Interface" %}

### Perplexity

Perplexity, being an "AI-search" from the beginning, is good at gathering and structuring information from the Internet. This ability, combined with native integrations with [TripAdvisor](https://tripadvisor.mediaroom.com/press-releases?item=126807){:target="_blank" rel="noopener"} and [Selfbook](https://www.phocuswire.com/perplexity-selfbook-agentic-ai-travel-booking-tripadvisor){:target="_blank" rel="noopener"}, makes it a unique choice for scenarios like trip planning and restaurant search. Perplexity shows a simple [MapBox map preview](https://www.testingcatalog.com/icymi-perplexity-rolls-out-live-local-search-maps-powered-by-mapbox/){:target="_blank" rel="noopener"} for places found and redirects to native maps application for routing. It answered correctly to my routing question, but I see in search logs that it totally relies on web-sources for this. This means that for more tricky queries, when less information is available online, it may fail to provide a correct answer.

{% include image-carousel.html id="perplexity-carousel" img1="/assets/images/posts/2025-09-28-maps-ai/perplexity_search.jpg" alt1="Perplexity Maps Search Interface" img2="/assets/images/posts/2025-09-28-maps-ai/perplexity_routes.jpg" alt2="Perplexity Maps Routing Feature" %}

### Anthropic Claude

Claude effectively integrates [native map services in its mobile app](https://support.anthropic.com/en/articles/11869629-using-claude-with-android-apps){:target="_blank" rel="noopener"}, having an ability to render a map with marks and widgets, redirecting to native maps application for routing. Like other assistants, it also relies on web search for places discovery and spatial reasoning.

{% include image-carousel.html id="claude-carousel" img1="/assets/images/posts/2025-09-28-maps-ai/claude_search.jpg" alt1="Claude Maps Search Interface" img2="/assets/images/posts/2025-09-28-maps-ai/claude_routes.jpg" alt2="Claude Maps Routing Feature" %}

## Wrap Up

We've discussed how popular AI assistants handle maps-related tasks and what are their strengths and weaknesses. This knowledge may help to choose the best tool for your needs, and also there are some tips that can help you to get more out of them:

1. Use each assistant's best strength to get the information you need. For example, Perplexity has a TripAdvisor and reservation's integration, making it a preferred choice for trip planning, while Gemini is a good choice for complex routing and spatial reasoning tasks.
2. Directly ask the assistant to export a list of places in KML format. This will allow you to open the list in your favorite maps application.
3. For advanced cases, you may use coding features like ChatGPT Canvas, Claude Artifacts or Perplexity Labs to ask an assistant to generate a code that will render a map with the marks you need.

For full control and more advanced features, you may use MCP servers from various Maps API providers and integrate them into your AI agents, which will be the topic of the next article.
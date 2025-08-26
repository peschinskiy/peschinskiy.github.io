---
layout: post
title: "Functional Programming Features in C++20 and C++23"
tags: [c++, functional programming]
---

This article demonstrates functional programming paradigms by transforming a single-file C++17 JSON parser through six commits using C++20 and C++23 features.
Each commit illustrates separate C++ feature and functional programming paradigm it implements.
Transformations are prioritizing declarative and abstract code over performance.
The goal is to show how modern C++ features may be applied to write simplified and declarative code for real life use cases.

<!--more-->

## How the Example Project is Organized

To demonstrate how modern C++ features can transform C++17 code, I created a single-file [project](https://github.com/peschinskiy/blogpost-json_stream_parser) implementing a single-pass streaming JSON parser.
The parser transforms an input stream of characters to formatted JSON just like `jq .` does.
For simplicity, this implementation omits booleans and nulls, as well as some proper error handling.
The entire project is implemented in one file and can be copy-pasted to an online compiler like [Coliru](https://coliru.stacked-crooked.com/a/c9e1c43be4588e49).

The project consists of three parts:
1. Lexer - a class that transforms input streams into tokens (language syntax primitives like **COLON**, **COMMA**, or **STRING** values) without grammar validation.
2. Parsers - classes receiving lexer tokens and returning JSON items: strings, numbers, objects and arrays.
Parsers validate language grammar and throw an error for missing comma, non-string object key or unclosed array.
3. Serializer - uses an output stream and the parser to stream out formatted JSON.

```c++
// Main type representing any JSON value
using json = std::variant<std::string, int64_t, double, object_stream, array_stream>;

// JSON Object parser, recursively returning inner value parsers
class object_stream {
    // ...
    iterator<std::pair<std::string, json>> begin();
    iterator<std::pair<std::string, json>> end();
};

// JSON Array parser, recursively returning inner value parsers
class array_stream {
    // ...
    iterator<json> begin();
    iterator<json> end();
};
```

All examples were tested using GCC 14 and Clang 19 compilers.
You can compare [initial](https://github.com/peschinskiy/blogpost-json_stream_parser/blob/master/json_17.cpp) and [final](https://github.com/peschinskiy/blogpost-json_stream_parser/blob/master/json_23.cpp) versions of the parser in the repository.

## Applying Features

### Lazy Evaluation - Coroutines

Let's start with the the serialization function:

```c++
void serialize(std::ostream& out, uint16_t indent_base, uint16_t level, json::json& value)
```

The dependency on `std::ostream` creates a side effect, which is hard to avoid since streaming serialization requires immediate output of parsed items.
A cleaner approach would be to return a character stream:

```c++
stream_of_chars serialize(uint16_t indent_base, uint16_t level, json::json& value)
```

Where `stream_of_chars` maintains intermediate parsing state - non-trivial to implement.

Coroutines solve this problem by providing stackless functions that can suspend and resume execution.
While C++20 provides interfaces for manual [coroutines](https://en.cppreference.com/w/cpp/language/coroutines.html) implementation, C++23 [introduced](https://en.cppreference.com/w/cpp/coroutine/generator.html) the first standard coroutine `std::generator`:

```diff
- void serialize(std::ostream& out, uint16_t indent_base, uint16_t level, json::json& value)
+ std::generator<std::string> serialize(uint16_t indent_base, uint16_t level, json::json& value)
  {
      if (auto* v = std::get_if<std::string>(&value)) {
-         out << std::quoted(*v);
+         co_yield std::format("\"{}\"", *v);
      } else if (auto* v = std::get_if<int64_t>(&value)) {
-         out << *v;
+         co_yield std::format("{}", *v);
      } else if (auto* v = std::get_if<double>(&value)) {
-         out << *v;
+         co_yield std::format("{}", *v);
      } else if (auto* v = std::get_if<json::object_stream>(&value)) {
-         out << "{";
+         co_yield "{";
          bool first = true;
          for (auto& pair : *v) {
-             if (!first) {
-                 out << ",";
-             }
+             if (!first)
+                 co_yield ",";
              first = false;
-             out << indent(indent_base, level + 1) << std::quoted(pair.first) << ": ";
-             serialize(out, indent_base, level + 1, pair.second);
+             co_yield std::format("{}\"{}\": ", indent(indent_base, level + 1), pair.first);
+             for (auto s : serialize(indent_base, level + 1, pair.second))
+                 co_yield s;
          }
-         out << indent(indent_base, level) << "}";
+         co_yield std::format("{}}}", indent(indent_base, level));
      } else if (auto* v = std::get_if<json::array_stream>(&value)) {
-         out << "[";
+         co_yield "[";
          bool first = true;
          for (auto& val : *v) {
-             if (!first) {
-                 out << ",";
-             }
+             if (!first)
+                 co_yield ",";
              first = false;
-             out << indent(indent_base, level + 1);
-             serialize(out, indent_base, level + 1, val);
+             co_yield indent(indent_base, level + 1);
+             for (auto s : serialize(indent_base, level + 1, val))
+                 co_yield s;
          }
-         out << indent(indent_base, level) << "]";
+         co_yield std::format("{}]", indent(indent_base, level));
      }
  }
```

### Sequence Operations - std::ranges

After making the `serialize` function a coroutine, we can leverage `std::generator` to simplify object and array serializing loops.
Note that the array serialization loop performs three operations simultaneously:

1. Add indentation
2. Recursively serialize value
3. Add comma after value

Since C++20, we have a tool to describe all three declaratively as a sequence of transformations made on `array_stream` values: `std::ranges`.
[Ranges](https://en.cppreference.com/w/cpp/ranges.html) are iterable sequences and **Views** are lightweight wrappers on ranges describing subrange or some kind of transformations on range values:

```c++
std::vector<int> vec{1,2,3};

std::vector<int> out;
std::transform(vec.begin(), vec.end(), std::back_inserter(out), [](int i) {return i*2;});
// multiplying function was applied eagerly
for (int i: out)
    std::print("{}", i);

auto view = vec | std::transform([](int i) {return i*2;});
// multiplying function is applied for single element at each loop iteration
for (int i: view)
    std::print("{}", i);
```

Using the fact that `std::generator` is a Range, we can rewrite array serialization in functional style:

```c++
// helper function for indentation and object pairs output
std::generator<std::string> add_left(std::string str, std::generator<std::string> g)
{
    co_yield str;
    co_yield std::ranges::elements_of(g);
}

std::generator<std::string> serialize(uint16_t indent_base, uint16_t level, json::json& value)
{
    ...
    } else if (auto* v = std::get_if<json::array_stream>(&value)) {
        // Declaring transformations over array_stream
        auto items = *v
            // Transform array item to lazy strings representation
            | std::views::transform([=](json::array_stream::value_type& val) { return serialize(indent_base, level + 1, val); })
            // Add indentation before value
            | std::views::transform([=](std::generator<std::string> g) { return add_left(indent(indent_base, level + 1), std::move(g)); })
            // Add comma separator
            | std::views::join_with(",");

        co_yield "[";
        // Transformations are actually applied here
        for (auto& item : items)
            co_yield item;
        co_yield std::format("{}]", indent(indent_base, level));
    }
}
```

Putting it all together:

```diff
 std::generator<std::string> serialize(uint16_t indent_base, uint16_t level, json::json& value)
 {
     if (auto* v = std::get_if<std::string>(&value)) {
         co_yield std::format("\"{}\"", *v);
     } else if (auto* v = std::get_if<int64_t>(&value)) {
         co_yield std::format("{}", *v);
     } else if (auto* v = std::get_if<double>(&value)) {
         co_yield std::format("{}", *v);
     } else if (auto* v = std::get_if<json::object_stream>(&value)) {
+        auto items = *v
+            | std::views::transform([=](json::object_stream::value_type& pair) { return add_left(std::format("\"{}\": ", pair.first), serialize(indent_base, level + 1, pair.second)); })
+            | std::views::transform([=](std::generator<std::string> g) { return add_left(indent(indent_base, level + 1), std::move(g)); })
+            | std::views::join_with(",");
         co_yield "{";
-        bool first = true;
-        for (auto& pair : *v) {
-            if (!first)
-                co_yield ",";
-            first = false;
-            co_yield std::format("{}\"{}\": ", indent(indent_base, level + 1), pair.first);
-            for (auto s : serialize(indent_base, level + 1, pair.second))
-                co_yield s;
-        }
+        for (auto& item : items)
+            co_yield item;
         co_yield std::format("{}}}", indent(indent_base, level));
     } else if (auto* v = std::get_if<json::array_stream>(&value)) {
+        auto items = *v
+            | std::views::transform([=](json::array_stream::value_type& val) { return serialize(indent_base, level + 1, val); })
+            | std::views::transform([=](std::generator<std::string> g) { return add_left(indent(indent_base, level + 1), std::move(g)); })
+            | std::views::join_with(",");
         co_yield "[";
-        bool first = true;
-        for (auto& val : *v) {
-            if (!first)
-                co_yield ",";
-            first = false;
-            co_yield indent(indent_base, level + 1);
-            for (auto s : serialize(indent_base, level + 1, val))
-                co_yield s;
-        }
+        for (auto& item : items)
+            co_yield item;
         co_yield std::format("{}]", indent(indent_base, level));
     }
 }
```

One more thing to make this work: making `object_stream` and `array_stream` iterable sequences requires:

1. Adding `begin()` and `end()` methods.
2. Declaring an `iterator` class with comparison, increment and dereference operators.

Making `object_stream` and `array_stream` *ranges* requires `iterator` to [conform](https://www.reedbeta.com/blog/ranges-compatible-containers/#defining-range-compatible-iterators) `std::input_iterator` requirements:

1. Replace `!=` comparison operator with comparison to sentinel value.
2. Add post-increment operator.
3. Make dereference operator `const`.

Use C++20 concepts to check whether custom iterators and sequences are conforming STL requirements:

```c++
static_assert(std::input_iterator<iterator<object_stream::value_type, object_stream>>);
static_assert(std::input_iterator<iterator<array_stream::value_type, array_stream>>);
static_assert(std::ranges::input_range<object_stream>);
static_assert(std::ranges::input_range<array_stream>);
```

### Type Classes - Concepts

Note that `array_stream` and `object_stream` transformations share the same steps, differing in two key aspects:

1. Serializing `object_stream` key-value pairs needs special handling.
2. Brackets differ for objects and arrays.

To deduplicate code, make the `serialize` function generic and handle:

1. All types of `json` variant.
2. `json` variant itself.
3. `object_type::value_type` which is key-value pair.

C++20 [concepts](https://en.cppreference.com/w/cpp/concepts.html) will help us to differentiate these types:

```c++
std::generator<std::string> serialize(uint16_t indent_base, uint16_t level, auto& value)
{
    using T = std::decay_t<decltype(value)>;
    // Equivalent to std::is_same_v
    if constexpr (std::same_as<T, json::json>) {
        co_yield std::ranges::elements_of(std::visit([=](auto& v) { return serialize(indent_base, level, v); }, value));
    } else if constexpr (std::same_as<T, std::string>) {
        co_yield std::format("\"{}\"", value);
    } else if constexpr (std::same_as<T, json::object_stream::value_type>) {
        // Handle object key-value pair
        co_yield std::format("\"{}\": ", value.first);
        co_yield std::ranges::elements_of(serialize(indent_base, level, value.second));
    // Equivalent to std::is_arithmetic_v
    } else if constexpr (std::integral<T> || std::floating_point<T>) {
        co_yield std::format("{}", value);
    // Range + input_iterator concept
    } else if constexpr (std::ranges::input_range<T>) {
        constexpr auto brackets = std::same_as<T, json::object_stream> ? std::make_pair("{", "}") : std::make_pair("[", "]");
        auto items = value
            | std::views::transform([=](auto& v) { return serialize(indent_base, level + 1, v); })
            | std::views::transform([=](auto g) { return add_left(indent(indent_base, level + 1), std::move(g)); })
            | std::views::join_with(",");

        co_yield brackets.first;
        for (auto& item : items)
            co_yield item;
        co_yield std::format("{}{}", indent(indent_base, level), brackets.second);
    }
}
```

Concepts are type interface requirements, or sets of properties and operations given generic types support.
Concepts were mostly implementable before C++20 using SFINAE, but with verbose syntax and error messages - concepts solve both problems.
Use cases are wide, but in our particular case concepts helped to generalize code and write pattern-matched and declarative `serialize` function.

### Currying - std::bind_front and std::bind_back

`std::views::transform` uses lambda wrappers over `serialize` and `add_left` functions.
Only the argument that changes between calls is the transformed value, while `indent_base` and `level + 1` remain the same.
This demonstrates partial function application, which may be handled in C++ using `std::bind`:

```c++
std::views::transform(std::bind(add_left, indent(indent_base, level + 1), std::placeholders::_1));
```

Since `std::bind` [requires](https://en.cppreference.com/w/cpp/utility/functional/bind.html) knowing argument counts and placeholders, currying offers a cleaner alternative.
Currying transforms functions that take multiple arguments into a sequence of functions taking a single argument: `f(1,2,3) -> f(1)(2)(3)`.
Currying is a subcase of partial argument application, and its simplicity makes implementation easier and more effective.
C++20's `std::bind_front` is an [implementation](https://en.cppreference.com/w/cpp/utility/functional/bind_front.html) of this idea:

```diff
 auto items = value
     // std::bind_front(serialize, indent_base, level + 1) would require explicit casting 
     // of generic `serialize` function to one of template specializations
     | std::views::transform([=](auto& val) { return serialize(indent_base, level + 1, val); })
-    | std::views::transform([=](auto g) { return add_left(indent(indent_base, level + 1), std::move(g)); })
+    | std::views::transform(std::bind_front(add_left, indent(indent_base, level + 1)))
     | std::views::join_with(",");
```

### Monadic Operations - std::optional and std::expected

The goal of `object_stream::next_value()` is parsing input chars `,"<key>":<value>` to `std::pair<std::string, json>` and throw if JSON grammar is violated.
This demonstrates a common procedural pattern:

1. Make some action.
2. Check the result.
3. Make next action.

Or this is a chain of conversions over `std::optional` stored value:

```diff
 std::optional<object_stream::value_type> object_stream::next_value()
 {
     // Consume closing bracket and exit if we reach the end of the object
     if (lexer_->try_consume_token(lexer::token_type::OBJECT_END)) {
         return std::nullopt;
     }
     // Consume comma if this key-value pair is not first
-    if (!first_pair_ && !lexer_->try_consume_token(lexer::token_type::COMMA)) {
-        throw parse_error { "Expected ',' between object pairs" };
-    }
+    return lexer_->try_consume_token(std::exchange(first_pair_, false) ? lexer::token_type::NOOP : lexer::token_type::COMMA)
+        .or_else([] -> std::optional<lexer::token> { throw parse_error("Expected ',' between object pairs"); })
     // Consume key and check it is string
-    first_pair_ = false;
-    auto key_token = lexer_->next_token();
-    if (key_token.type != lexer::token_type::STRING) {
-        throw parse_error { "Expected string key" };
-    }
+        .and_then([&](const auto&) { return lexer_->try_consume_token(lexer::token_type::STRING); })
+        .or_else([] -> std::optional<lexer::token> { throw parse_error("Expected string key"); })
     // Consume : between key and value
-    auto key = std::get<std::string>(*key_token.value);
-    if (!lexer_->try_consume_token(lexer::token_type::COLON)) {
-        throw parse_error { "Expected ':' after key" };
-    }
+        .and_then([&](const auto& tok) {
+            return lexer_->try_consume_token(lexer::token_type::COLON).transform([&](const auto&) { 
+                return std::get<std::string>(*tok.value);
+            }); 
+        })
+        .or_else([] -> std::optional<std::string> { throw parse_error("Expected ':' after key"); })
     // Parse value
-    return std::make_pair(std::move(key), parse_value(lexer_));
+        .transform([&](const auto& key) { return object_stream::value_type(key, parse_value(lexer_)); });
 }
```

Using C++23 `std::expected` it is possible to pass error values through transformation chains implicitly:

```c++
[[nodiscard]] std::expected<token, std::string> try_consume_token(token_type type)
{
    if (token_type::NOOP == type) {
        return token { token_type::NOOP, std::nullopt };
    }
    if (auto actual = peek_type(); actual != type) {
        // Pass error value when unexpected condition is met
        return std::unexpected { std::format("Expected token {}, got {}", std::to_underlying(type), std::to_underlying(actual)) };
    }
    return next_token();
}

std::optional<object_stream::value_type> object_stream::next_value()
{
    // Consume closing bracket and exit if we reach the end of the object
    if (lexer_->try_consume_token(lexer::token_type::OBJECT_END)) {
        return std::nullopt;
    }
    // Consume comma if this key-value pair is not first
    auto value = lexer_->try_consume_token(std::exchange(first_pair_, false) ? lexer::token_type::NOOP : lexer::token_type::COMMA)
        // Consume key and check it is string
        .and_then([&](const auto&) { return lexer_->try_consume_token(lexer::token_type::STRING); })
        // Consume : between key and value
        .and_then([&](const auto& tok) { 
            return lexer_->try_consume_token(lexer::token_type::COLON).transform([&](const auto&) { 
                return std::get<std::string>(*tok.value); 
            });
        })
        // Parse value
        .transform([&](const auto& key) { return object_stream::value_type(key, parse_value(lexer_)); });
    if (!value) { // Handle error condition if any
        throw parse_error { value.error() };
    }
    return std::move(*value);
}
```

### Compile-time Execution - Enhanced constexpr and consteval

> "If a Haskell program compiles, it probably works"

A strong typing system, explicit side effects, and compile-time checking mitigate numerous error categories and may save runtime performance.
C++ [constexpr](https://en.cppreference.com/w/cpp/language/constexpr.html) capabilities have evolved in every new standard, and C++20 and C++23 have introduced some important changes:

- `constexpr` ranges
- `constexpr` `std::vector` and `std::string`
- Dynamic memory allocation in `constexpr` contexts
- `consteval` functions for guaranteed compile-time evaluation

These features make it possible to implement a stateless compile-time JSON parser.
Such a parser may be useful for parsing huge config resources or conditional parsing depending on compilation context.
Here's how the usage might look:

```c++
struct Config {
    int indent = 0;
    std::string format = "json";

    constexpr Config() = default;

    static constexpr Config parse(json::json& object)
    {
        assert(std::holds_alternative<json::object_stream>(object));
        Config config;
        for (const auto& [k, v]: object) {
            if (k == "indent") {
                config.indent = std::get<int>(v);
            } else if (k == "format") {
                config.format = std::get<std::string>(v);
            }
        }
        return config;
    } 
};

static_assert(Config::parse(json::parse(R"({"indent": 2, "format": "json"})")).indent == 2);
```

[Working code example](https://godbolt.org/z/nc61v4631)

## Conclusion

This article covered functional programming paradigms and their implementation using the latest C++ standards.
Still, C++ continues to evolve and upcoming standards are announcing more tools related to functional programming.
C++26 will introduce `std::copyable_function` and `std::function_ref` for effective callable handling.
[Reflection](https://herbsutter.com/2025/06/21/trip-report-june-2025-iso-c-standards-meeting-sofia-bulgaria/) in C++26 is a long-awaited step toward compile-time type processing and RTTI.
Existing changes and future proposals such as [P2688 Pattern Matching](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2688r3.html) clearly demonstrate C++'s evolution toward a modern functional and declarative language.

import openai


def flashCards (input_texts) -> list[dict]:
    api_key = "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" 
    notes = str(input_texts)
    print("notes: ", notes)
    prompt = "Give me an array of 5 objects with fields prompt and answer where prompt has the question and answer has the answer use this input as the material:" + notes

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=3800,
        api_key=api_key
    )

    answer = response.choices[0].text
    print(answer)
    return answer

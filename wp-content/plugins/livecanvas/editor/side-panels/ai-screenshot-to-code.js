// AI Screenshot to code js

// SUPPORT FUNCTIONS //////////////////////////////////////////////
async function convertImageToBase64(image) {
    if (!image) {
        throw new Error("No image selected");
    }

    // create a function that returns a promise to read the file
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // resolve with base64 string
            reader.onerror = reject; // reject in case of an error
            reader.readAsDataURL(file); // start the reading process
        });
    };

    try {
        // use await to wait for the conversion
        const base64Image = await toBase64(image);
        return base64Image;
    } catch (error) {
        swal("Error converting image to base64:", error);
    }
}



// SCREENSHOT TO CODE //////////////////////////////////////////////
// user clicks Submit Button in screenshot to code: make the request
$("body").on("click", "input[name=ai-screenshot-submit]", async function (e) {
    e.preventDefault();

    const selectedModel = $('select[name=ai_screenshot__choose_model]').val();

    setEditorPreference("ai_screenshot_selected_model", selectedModel);

    const ai_service = $('select[name=ai_screenshot__choose_model] option:selected').parent('optgroup').attr('label');

    let endpoint = "";
    let ai_apikey = "";

    if (ai_service == "") {
        alert("No AI provider selected");
        return;
    }
    if (ai_service == 'OpenAI') {
        endpoint = "https://api.openai.com/v1/chat/completions";
        ai_apikey = lc_editor_openai_key;
    }
    if (ai_service == 'OpenRouter') {
        endpoint = 'https://openrouter.ai/api/v1/chat/completions';
        ai_apikey = lc_editor_openrouter_key;
    }

    //if no key provided, help the user
    if (ai_apikey == "") {
        swal({
            title: "No " + ai_service + " API Key",
            text: "Would you like to set the API key in the backend panel?",
            icon: "warning",
            buttons: true,
        })
            .then((willGoToSettings) => {
                if (willGoToSettings) {
                    // If the user confirms, open the settings page in a new tab
                    window.open(lc_editor_saving_url.replace('admin-ajax.php', 'admin.php?page=livecanvas_integration'), '_blank').focus();
                }
            });
        return false;
    }

    // disable the button
    $(this).prop("disabled", true);
    const selector = $(this).closest("[selector]").attr("selector");
    //console.log(selector);
    const currentHtml = getPageHTMLOuter(selector);
    //console.log(currentHtml);
    const userPrompt = document.querySelector(
        "textarea[name=ai-screenshot-prompt]",
    ).value;

    const additionalInformations = $('#ai-screenshot-prompt').val();

    let base64Image = "";
    // get the image value from ai-screenshot
    const image = document.querySelector("input[name=ai-screenshot]").files[0];

    if (!image) {
        swal("No image selected");
        $(this).prop("disabled", false);
        return false;
    }
    // convert the image in a base64 format
    base64Image = await convertImageToBase64(image);

    //console.log(userPrompt);
    const thePrompt = {
        role: "user",
        content: [{
            type: "text",
            text: "Turn this screenshot into HTML code and only return the code. ",
        },
        {
            type: "image_url",
            image_url: {
                url: base64Image,
            },
        },
        ],
    };

    if (additionalInformations) {
        thePrompt.content.push({
            type: "text",
            text: `
                To be more precise and add context or instructions for your task, here are some additional informations:

                ${additionalInformations}
            `,
        });
    }

    //setPageHTML(selector, 'working...');
    //alert("Prompting GPT. Please wait! "); //TEST


    const query = {
        model: selectedModel,
        messages: [{
            role: "system",
            content: `You are tasked with converting a screenshot image provided by the user into HTML code using the ${theFramework.name} ${theFramework.version} " framework. 
The goal is to recreate the layout, text alignment, images, colors, and overall appearance of the screenshot as closely as possible.
Instructions:

${theFramework.name} ${theFramework.version} Classes: Use ${theFramework.name} ${theFramework.version} classes extensively to build the layout and style elements.
Text Content: Replicate the text from the screenshot. If the text is unclear or unreadable, use appropriate dummy text.
Images: Use a placeholder image service for any images (e.g., via a placeholder image URL like this: https://placehold.co that you can use with the size you want, eg: https://placehold.co/600x400).
Output Format: Provide only the HTML code without any Markdown formatting.
Exclude Boilerplate Code: Do not include the <!DOCTYPE html> declaration or any <html>, <head>, <meta>, or <title> tags. These are already included in the environment.
Styles and Scripts: Do not include any <style> tags, external CSS files, or <script> tags. Limit the use of inline styles as much as possible.
Comments: Do not add any comments or comment lines in the code.
Editable Text: All text elements (e.g., <h1>, <p>, <span>) must include the attribute editable="inline".

Your response should strictly adhere to these guidelines to produce clean, functional HTML code that mirrors the provided screenshot.
        `,
        },
            thePrompt,
        ],
    };

    if (0) { ////FOR DEBUG
        console.log("AI query:");
        console.log(query);
    }

    $("html").addClass("system-is-working");

    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ai_apikey}`,
        },
        body: JSON.stringify(query),
    })
        .then(function (response) {
            if (!response.ok) {
                let theErrorMessage = 'Response not ok. Status: ' + response.status;

                if (response.status == 401) {
                    theErrorMessage = "Forbidden. The provided OpenAI API key may be incorrect.";
                }
                swal(theErrorMessage);
                throw new Error(theErrorMessage);
            }
            return response.json();
        })
        .then((data) => {
            $("html").removeClass("system-is-working");
            //console.log( data); // Logs the full response object to the console

            // enable the buttons
            $(this).prop("disabled", false);
            $('[name="ai-screenshot-reject"]').prop("disabled", false);

            //check if we got answers from AI
            if (data.choices && data.choices.length > 0) {
                
                let responseText = data.choices[0].message.content; // Assuming the structure matches the response

                const selector = $(this).closest("[selector]").attr("selector");

                //for G gemini, strip delimiters
                if (responseText.startsWith("```html") && responseText.endsWith("```")) {
                    responseText = responseText.slice(7, -3);
                }

                setPageHTML(selector, responseText);
                //console.log("New html: " + responseText);
                updatePreviewSectorial(selector);
            } else {
                swal("Error: no answer from AI for this request. ");
            }
        })
        .catch((error) => {
            $("html").removeClass("system-is-working");
            swal("Error:", error);
        });

}); //end function


// user clicks REJECT button
$("body").on("click", "input[name=ai-screenshot-reject]", async function (e) {
    e.preventDefault();
    const selector = $(this).closest("[selector]").attr("selector");
    //console.log(selector);
    const oldHtml = localStorage.getItem('backup_outerhtml_before_ai')
    setPageHTMLOuter(selector, oldHtml);
    updatePreviewSectorial(selector);
    // enable the button
    $(this).prop("disabled", false);
});
